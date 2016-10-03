public interface Value {
	Object getValue();
	String getType();
}

class IntValue implements Value {
	private final String IMPLEMENT_TYPE = "int";
	private Object value;
	private String type;

	public IntValue(Object value, String type) {
		this.value = value;
		this.type = type;
	}

	public IntValue(String str) {
		try {
			this.value = Integer.parseInt(str);
		}
		catch(NumberFormatException ex) {
			this.value = 0;
		}
		this.type = this.IMPLEMENT_TYPE;
	}
	public Object getValue() {
		return this.value;
	}
	public String getType() {
		return this.type;
	}
}
