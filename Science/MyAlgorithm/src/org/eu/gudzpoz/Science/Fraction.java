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
 * A class for storing fractions.
 * 
 * @author otaku
 * @version 1.0
 */
public class Fraction {
    private final int denominator, numerator;
    
    /**
     * Constructs a new fraction.
     * 
     * @param numerator the numerator of this fraction
     * @param denominator the denominator of this fraction
     */
    public Fraction(int numerator, int denominator) {
        int gcd = SimpleMath.gcd(numerator, denominator);
        this.numerator = numerator / gcd;
        this.denominator = denominator / gcd;
    }
    
    /**
     * Returns the numerator of this fraction.
     * 
     * @return the numerator of this fraction
     */
    public int getNumerator() {
        return this.numerator;
    }
    
    /**
     * Returns the denominator of this fraction.
     * 
     * @return the denominator of this fraction
     */
    public int getDenominator() {
        return this.denominator;
    }
    
    /**
     * Returns the approximate value of this fraction in double.
     * 
     * @return the approximate value of this fraction
     */
    public double getValue() {
        return (double)this.numerator / this.denominator;
    }
    
    /**
     * Returns a string representation of the approximate of this fraction.
     * Should equal <code>Double.toString(fractionInctance.getValue())</code>.
     * 
     * @return a string representation of the approximate of this fraction
     */
    @Override
    public String toString() {
        return Double.toString(this.getValue());
    }
}

