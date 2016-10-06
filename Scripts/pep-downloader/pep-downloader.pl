#! /usr/bin/perl

use warnings;
use utf8;
use Getopt::Long;

# We get all the file names below by a browser.
#$count_down = '1054785';
#$count_end = '1054673';
#$dir = 'http://www.pep.com.cn/gzwl/jszx/tbjx/kb/dzkb/bx1/201107/';
#$file = 't20110712_';
#$append = '.htm';

$start = '';
$end = '';

$count_down = '';
$count_end = '';
$dir = '';
$file = '';
$append = '';

GetOptions(
	'start=s'	=>	\$start,
	'end=s'	=>	\$end,
);

$start ne '' or die "pep-downloader: error: argvment lost: --start= or -s\n";
$end ne '' or die "pep-downloader: error: argvment lost: --end= or -e\n";

$dir = substr $start, 0, rindex( $start, '/' ) + 1;
$dir eq substr ( $start, 0, rindex( $start, '/' ) + 1 ) or die "pep-downloader: error: not the same web-address\n";
$start = substr $start, rindex( $start, '/' ) + 1;

$file = substr $start, 0, rindex( $start, '_' ) + 1;
$start = substr $start, rindex( $start, '_' ) + 1;

$count_down = substr $start, 0, rindex( $start, '.' );
$append = substr $start, rindex( $start, '.' );

$end = substr $end, rindex( $end, '/' ) + 1;
$end = substr $end, rindex( $end, '_' ) + 1;
$count_end = substr $end, 0, rindex( $end, '.' );

-e "./pep.log" and unlink "./pep.log";

$i = 0;
while( $count_down ne $count_end )
{
	$address = $dir.$file.$count_down.$append;
	@result = split /\n/, `curl $address 2>>./pep.log | grep 'img' -i | grep 'oldsrc' -i`;
	
	if ( defined ( $result[1] ) )
	{
		die "pep-downloader: error: $address: more than one IMG label with OLDSRC \n";
	}
	
	if ( defined ( $result[0] ) )
	{
	    $result[0] =~ m/img[^>]+?src="?(.+?\.jpg)/i;
	    $img_address = $dir.$1;
	    $name2save = $i.'.jpg';
	    `wget $img_address -O $name2save 2>>./pep.log`;
	    print "pep-downloader: $img_address saved as $name2save \n";
	    ++$i;
	}
	else
	{
	    print "pep-downloader: error: $address: 404 Not Found \n";
	}
		
	$count_down = ( $count_down - 1 )."";
}

