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

/**
 * Provides some methods to some simple math algorithms.
 * 
 * @author otaku
 * @version 1.0
 */
public abstract class SimpleMath {
    /**
     * Calculates the Great Common Divisor of a and b.
     * 
     * @param a an argument
     * @param b another argument
     * @return the Great Common Divisor of the a and b
     */
    static int gcd(int a, int b) {
        int remainder;
        while(b != 0) {
            remainder = b;
            b = a % b;
            a = remainder;
        }
        return a;
    }
    
    /**
     * Calculates the Least Common Multiple of a and b.
     * 
     * @param a an argument
     * @param b another argument
     * @return the Least Common Multiple of a and b
     */
    static int lcm(int a, int b) {
        return a * b / gcd(a, b);
    }
    
    /**
     * Calculates the simplest ratio of the fractions.
     * 
     * @param numbers the numbers for calculating
     * @return the ratio in a integer array
     */
    static int[] getRatio(int[] numbers) {
        int[] result = new int[numbers.length];
        if(result.length != 0) {
            int divisor = numbers[0];
            for(int i = 1; i != result.length; ++i) {
                divisor = gcd(divisor, numbers[i]);
            }
            for (int i = 0; i != result.length; ++i) {
                result[i] = numbers[i] / divisor;
            }
        }
        return result;
    }
    
    /**
     * Calculates the simplest ratio of the fractions.
     * 
     * @param fractions the fraction for calculating
     * @return the ratio in a integer array
     */
    static int[] getRatio(Fraction[] fractions) {
        int denominator = 1;
        int[] result = new int[fractions.length];
        for(int i = 0; i != fractions.length; ++i) {
            denominator = lcm(fractions[i].getDenominator(), denominator);
        }
        for(int i = 0; i != fractions.length; ++i) {
            Fraction f = fractions[i];
            result[i] = f.getNumerator() * (denominator / f.getDenominator());
        }
        
        result = getRatio(result);
        return result;
    }
}

