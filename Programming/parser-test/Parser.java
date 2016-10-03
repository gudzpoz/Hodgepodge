import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.FileNotFoundException;

public class Parser {
	static final char[] spaceChars = new char[] {' ', '\t', '\n', ')'};
	static boolean isSpace(char c) {
		for(int i = 0; i != spaceChars.length; ++i) {
			if(c == spaceChars[i]) {
				return true;
			}
		}
		return false;
	}
	static int nextSpace(String str, int start) {
		int index = str.length();
		for(int i = 0; i != spaceChars.length; ++i) {
			int newIndex = str.indexOf(spaceChars[i], start);
			if(newIndex != -1 && newIndex < index) {
				index = newIndex;
			}
		}

		if(index == str.length()) {
			return -1;
		}
		else {
			return index;
		}
	}
	static int getExpr(String sentence, int start) {
		if(sentence.charAt(start) == '(') {
			int quote = 0;
			for(int i = start; i != sentence.length(); ++i) {
				if(sentence.charAt(i) == '(') {
					++quote;
				}
				else if(sentence.charAt(i) == ')') {
					--quote;
				}
				else {
					// nothing
				}
				
				if(quote == 0) {
					return (i + 1);
				}
			}
			return -1;
		}
		else {
			return nextSpace(sentence, start);
		}
	}

	public static void main(String[] args) {
		if(args.length == 0) {
			InputStreamReader in = new InputStreamReader(System.in);
			parser(in);
		}
		else try {
		FileInputStream file = new FileInputStream(args[0]);
		InputStreamReader in = new InputStreamReader(file);
		parser(in);
		}
		catch(FileNotFoundException ex) {
			//
		}
	}
	
	protected static void parser(InputStreamReader in) {
		String expr = "";
		while(true) {
			char c;
			try {
			c = (char)in.read();
			}
			catch(IOException ex) {
				break;
			}
			if(c == '\n') {
				break;
			}
			expr += c;
		}
		System.out.println(expression(expr).getValue().toString());
	}
	protected static Value expression(String expr) {
		if(expr.charAt(0) == '(') {
			String op = null;
			ArrayList<Value> es = new ArrayList<>();
			for(int i = 1; i != expr.length(); ++i) {
				if(isSpace(expr.charAt(i))) {
					continue;
				}
				else if(expr.charAt(i) == ')') {
					break;
				}
				if(op == null) {
					int end = getExpr(expr, i);
					op = expr.substring(i, end);
					i = end - 1; // add 1 when continue
				}
				else {
					int end = getExpr(expr, i);
					String e = expr.substring(i, end);
					i = end - 1;
					es.add(expression(e));
				}
			}
			int result = 0;
			Value v1 = es.get(0);
			if(op.equals("+")) {
				result = ((Integer)v1.getValue()).intValue();
				for(int i = 1; i != es.size(); ++i) {
					Value v = es.get(i);
					if(v.getType().equals("int")) {
						result += ((Integer)v.getValue()).intValue();
					}
				}
			}
			else if(op.equals("-")) {
				result = ((Integer)v1.getValue()).intValue();
				for(int i = 1; i != es.size(); ++i) {
					Value v = es.get(i);
					if(v.getType().equals("int")) {
						result -= ((Integer)v.getValue()).intValue();
					}
				}
			}
			else if(op.equals("*")) {
				result = ((Integer)v1.getValue()).intValue();
				for(int i = 1; i != es.size(); ++i) {
					Value v = es.get(i);
					if(v.getType().equals("int")) {
						result *= ((Integer)v.getValue()).intValue();
					}
				}
			}
			else if(op.equals("/")) {
				result = ((Integer)v1.getValue()).intValue();
				for(int i = 1; i != es.size(); ++i) {
					Value v = es.get(i);
					if(v.getType().equals("int")) {
						result /= ((Integer)v.getValue()).intValue();
					}
				}
			}
			return new Value(Integer.toString(result));
		}
		else {
			return new Value(expr);
		}
	}
}

class Value {
	protected String type;
	protected Object value;

	public Value(String expr) {
		try {
			this.value = Integer.parseInt(expr);
			this.type = "int";
		}
		catch(NumberFormatException ex) {
			value = new Integer(0);
		}
	}

	public Object getValue() {
		return value;
	}
	public String getType() {
		return type;
	}
}
