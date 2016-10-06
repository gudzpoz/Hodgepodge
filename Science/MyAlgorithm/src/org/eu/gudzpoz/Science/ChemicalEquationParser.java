/*
 * Copyright (C) 2016 otaku
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package org.eu.gudzpoz.Science;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.HashMap;

/**
 *
 * @author otaku
 */
public abstract class ChemicalEquationParser {
	static String simplify(String equation) {
		return equation.replaceAll("\\s", "")
				.replaceAll("^\\d+", "")
				.replaceAll("\\+\\d+", "+")
				.replaceAll("=.+=", "=")
				.replaceAll("=\\d+", "=");
		
	}
	static void add(HashMap<String, Integer> map, String key, Integer addend, int multiplier) {
		if(map.containsKey(key)) {
			int base = map.remove(key);
			map.put(key, base + addend * multiplier);
		}
		else {
			map.put(key, addend * multiplier);
		}
	}
	static void add(HashMap<String, Integer> map, String key, Integer addend) {
		add(map, key, addend, 1);
	}
	static int[] getNumber(String formula, int offset) {
		String numberString = "";
		int number;
		while(offset < formula.length() 
				&& Character.isDigit(formula.charAt(offset))) {
			numberString += formula.charAt(offset);
			++offset;
		}
		if(numberString.isEmpty()) {
			number = 1;
		}
		else {
			number = Integer.parseInt(numberString);
		}
		int[] result = new int[2];
		result[0] = number;
		result[1] = offset;
		return result;
	}
	
	// Returns the next offset
	static int count(HashMap<String, Integer> storage, String formula, int offset) {
		if(Character.isUpperCase(formula.charAt(offset))) {
			String element = "" + formula.charAt(offset);
			++offset;
			while(offset < formula.length() 
					&& Character.isLowerCase(formula.charAt(offset))) {
				element += formula.charAt(offset);
				++offset;
			}
			int[] number = getNumber(formula, offset);
			offset = number[1];
			add(storage, element, number[0]);
		}
		else if(formula.charAt(offset) == '(') {
			++offset;
			HashMap<String, Integer> innerStorage = new HashMap<>();
			while(formula.charAt(offset) != ')') {
				offset = count(innerStorage, formula, offset);
			}
			++offset;
			int[] number = getNumber(formula, offset);
			offset = number[1];
			
			Iterator<Map.Entry<String, Integer>> i = innerStorage.entrySet().iterator();
			while(i.hasNext()) {
				Map.Entry<String, Integer> entry = i.next();
				String key = entry.getKey();
				int value = entry.getValue();
				add(storage, key, value, number[0]);
			}
		}
		return offset;
	}
	
	static HashMap<String, Integer> count(String formula) {
		HashMap<String, Integer> storage = new HashMap<>();
		int offset = 0;
		while(offset < formula.length()) {
			offset = count(storage, formula, offset);
		}
		return storage;
	}
	
	public static int[][] toSystem(String chemicalEquation) {
		String[] sides = simplify(chemicalEquation).split("=");
		String[] left = sides[0].split("\\+");
		String[] right = sides[1].split("\\+");
		int width = left.length + right.length + 1;
		HashMap<String, Integer> mapper = new HashMap<>();
		ArrayList<int[]> system = new ArrayList<>();
		
		for(int i = 0; i != left.length; ++i) {
			HashMap<String, Integer> storage = count(left[i]);
			Iterator<Map.Entry<String, Integer>> iter = storage.entrySet().iterator();
			while(iter.hasNext()) {
				Map.Entry<String, Integer> entry = iter.next();
				String key = entry.getKey();
				if(mapper.containsKey(key)) {
					system.get(mapper.get(key))[i] = entry.getValue();
				}
				else {
					mapper.put(key, system.size());
					system.add(new int[width]);
					system.get(mapper.get(key))[i] = entry.getValue();
				}
			}
		}
		int base = left.length;
		for(int i = 0; i != right.length; ++i) {
			HashMap<String, Integer> storage = count(right[i]);
			Iterator<Map.Entry<String, Integer>> iter = storage.entrySet().iterator();
			while(iter.hasNext()) {
				Map.Entry<String, Integer> entry = iter.next();
				String key = entry.getKey();
				if(mapper.containsKey(key)) {
					system.get(mapper.get(key))[i + base] = -entry.getValue();
				}
				else {
					mapper.put(key, system.size());
					system.add(new int[width]);
					system.get(mapper.get(key))[i + base] = -entry.getValue();
				}
			}
		}
		
		int[] fixer = new int[width];
		fixer[0] = 1;
		fixer[width - 1] = 1;
		system.add(fixer);
		
		return (int[][])system.toArray(new int[0][0]);
	}
	
	static String apply(String equation, int[] solution) {
		String[] sides = simplify(equation).split("=");
		String[] left = sides[0].split("\\+");
		String[] right = sides[1].split("\\+");
		
		String result = "";
		for(int i = 0; i != left.length; ++i) {
			result += "+";
			if(solution[i] == 1) {
				result += left[i];
			}
			else {
				result += Integer.toString(solution[i]) + left[i];
			}
		}
		result += "=";
		for(int i = 0; i != right.length; ++i) {
			if(solution[left.length + i] == 1) {
				result += right[i];
			}
			else {
				result += Integer.toString(solution[left.length + i]) + right[i];
			}
			result += "+";
		}
		return result.replaceAll("^\\+", "").replaceAll("\\+$", "");
	}
}