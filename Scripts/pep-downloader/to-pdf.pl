#! /usr/bin/perl

use warnings;
use utf8;

defined $ARGV[0] or $ARGV[0] = 'output.pdf';

$cmd = '';
for ( $i =0; -e ($i.'.jpg'); ++$i)
{
	$cmd .= $i.'.jpg ';
}
`convert $cmd ${ARGV[0]}`;

