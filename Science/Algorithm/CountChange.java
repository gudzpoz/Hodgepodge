import java.lang.System;
import java.lang.Integer;
import java.lang.String;
import java.lang.NumberFormatException;

public class CountChange {
    public static void main(String[] args) {
	int amount = 0;
	if(args.length < 1) {
	    System.out.println("usage: java CountAmount amount");
	    System.out.println("    amount: the money you want to change ( in cent )");
	    return;
	}
	try {
	    amount = Integer.parseInt(args[0]);
	}
	catch(NumberFormatException e) {
	    System.out.println(e);
	}
	CountChange cc = new CountChange(amount);
	cc.solve(1);
    }

    int amount;

    public CountChange(int amount) {
	this.amount = amount;
    }

    public int solve(int way) {
	return -1;
    }
}
