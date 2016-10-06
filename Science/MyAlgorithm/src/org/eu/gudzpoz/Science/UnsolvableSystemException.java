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
 * Thrown when a system unable to solve.
 * 
 * @author otaku
 * @version 1.0
 */
public class UnsolvableSystemException extends Exception {
    protected Fraction[] solution;
    
    /**
     * Constructs a new <code>UnsolvableSystemException</code> 
     * with the specified detail message and a incomplete solution.
     * 
     * @param message the detail message
     * @param solution the incomplete solution to the unsolvable system
     */
    public UnsolvableSystemException(String message, Fraction[] solution) {
        super(message);
        this.solution = solution;
    }
        
    /**
     * Returns the incomplete solution to the unsolvable system.
     * 
     * @return the solution given in {@link #UnsolvableSystemException(java.lang.String, org.en.gudzpoz.Science.Fraction[]) }.
     */
    public Fraction[] getSolution() {
        return solution;
    }
}

