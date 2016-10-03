import java.lang.System;
import java.lang.Integer;
import java.lang.NumberFormatException;
import java.util.List;
import java.util.ArrayList;

public class Joseph {
    public static void main(String []args) {
	if(args.length < 3) {
	    System.out.println("usage: java Joseph people number k");
	    System.out.println("    people: the number of people");
	    System.out.println("    number: the number when one called it will leave");
	    System.out.println("    k: the start number of people ( start from 0 )");
	    return;
	}
	int people, number, k;
	try {
	    people = Integer.parseInt(args[0]);
	    number = Integer.parseInt(args[1]);
	    k = Integer.parseInt(args[2]);
	}
	catch(NumberFormatException e) {
	    System.out.println(e);
	    return;
	}
	JosephProblem jp = new JosephProblem(people, number, k);
	System.out.println(jp.solve(1));
	System.out.println(jp.solve(2));
    }
}

class JosephProblem extends Algorithm {
    protected int people, number, k;
    protected int result = -1;
    
    public JosephProblem(int people, int number, int k) {
	this.people = people;
	this.number = number;
	this.k = k;
    }

    protected int solve1way() {
	ArrayList<Integer> table = new ArrayList<Integer>();
	for(int i = 0; i != this.people; ++i) {
	    table.add(new Integer(i));
	}
	int number = 0;
	for(int i = this.k; table.size() != 1; i = i % table.size()) {
	    ++number;
	    if(number == this.number) {
		table.remove(table.get(i));
		number = 0;
	    }
	    else {
		++i;
	    }
	}
	return table.get(0).intValue();
    }

    protected int solve2way()
    {
	ArrayList<Integer> table = new ArrayList<Integer>();
	for(int i = 0; i != this.people; ++i) {
	    table.add(new Integer(i));
	}
	for(int k = this.k; table.size() != 1; table.remove(table.get(k))) {
	    k = ((k + this.number - 1) % table.size()) % table.size();
	}
	return table.get(0).intValue();
    }

    public int ways() {
	return 2;
    }

    public int solve(int way) {
	if(this.people <= 0) {
	    System.out.println("people must be greater than 0");
	    this.result = -1;
	    return -1;
	}
	if(this.number <= 0) {
	    System.out.println("number must be greater than 0");
	    this.result = -1;
	    return -1;
	}
	if(way == 1) {
	    this.result = this.solve1way();
	}
	else if(way == 2) {
	    this.result = this.solve2way();
	}
	else {
	    result = -1;
	}
	return this.result;
    }
}
