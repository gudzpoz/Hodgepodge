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
 *
 * @author otaku
 */
import java.util.ArrayList;

public abstract class LinearEquationSystemSolver {
    protected static int indexOfFirstNonzeroCoefficient(int[] equation, int start) {
        for(int i = start; i < equation.length; ++i) {
            if(equation[i] != 0) {
                return i;
            }
        }
        return -1;
    }
    protected static int indexOfFirstNonzeroCoefficient(int[] equation) {
        return indexOfFirstNonzeroCoefficient(equation, 0);
    }
    protected static int[] simplify(int[] equation) {
        //   Get the GCD of the coefficients of the unknowns
        int gcd = equation[indexOfFirstNonzeroCoefficient(equation)];
        for(int i = indexOfFirstNonzeroCoefficient(equation) + 1; i != equation.length; ++i) {
            if(equation[i] != 0) {
                gcd = SimpleMath.gcd(gcd, equation[i]);
            }
        }
        //   Let every coefficient divided by the GCD
        for(int i = 0; i != equation.length; ++i) {
            equation[i] /= gcd;
        }
        return equation;
    }
    protected static boolean isSolved(int[] equation) {
        int index = indexOfFirstNonzeroCoefficient(equation);
        if(index != -1) {
            int rightSide = indexOfFirstNonzeroCoefficient(equation, index + 1);
            if(rightSide == equation.length - 1 || rightSide == -1) {
                return true;
            }
        }
        return false;
    }
    protected static void mergeWithSolvedEquation(int[][] system, Fraction[] result) {
        for(int i = 0; i != system.length; ++i) {
                if(isSolved(system[i])) {
                    for(int j = 0; j != system.length; ++j) {
                        if(j != i && !isSolved(system[j]) && indexOfFirstNonzeroCoefficient(system[j]) != -1) {
                            int[] merged = merge(system[j], system[i]);
                            if(merged != null) {
                                system[j] = merged;
                            }
                        }
                    }
                    int unknownIndex = indexOfFirstNonzeroCoefficient(system[i]);
                    result[unknownIndex] = new Fraction(system[i][system[0].length - 1], system[i][unknownIndex]); 
                    system[i][unknownIndex] = 0;
                    system[i][system[0].length - 1] = 0;
                    i = 0;
                }
            }
    }
    protected static int[] merge(int[] equation1, int[] equation2) {
        // The length of the two equations should equal
        // Select the less length for the length we use
        int length = (equation1.length < equation2.length)?equation1.length:equation2.length;

        // Select the index of the unknown to merge
        int index = -1, index1 = 0, index2 = 0;
        while(index1 < length && index2 < length) {
            index1 = indexOfFirstNonzeroCoefficient(equation1, index1);
            index2 = indexOfFirstNonzeroCoefficient(equation2, index2);
            if(index1 == index2) {
                index = index1;
                break;
            }
            else if(index1 == -1 || index2 == -1) {
                break;
            }
            else {
                // Align the indexes with the larger one
                if(index1 < index2) {
                    index1 = index2;
                }
                if(index2 < index1) {
                    index2 = index1;
                }
            }
        }
        if(index == -1) {
            // Can't merge the two equations
            return null;
        }
        
        // Let the coefficient of the unknown equal
        int multiplier1 = SimpleMath.lcm(equation1[index], equation2[index]) / equation1[index];
        int multiplier2 = SimpleMath.lcm(equation1[index], equation2[index]) / equation2[index];
        for(int i = 0; i != length; ++i) {
            equation1[i] *= multiplier1;
            equation2[i] *= multiplier2;
        }

        // Substract one from the other so that the coefficient of the unknow is zero
        int[] result = new int[length];
        for(int i = 0; i != length; ++i) {
            result[i] = equation1[i] - equation2[i];
        }
        
        if(indexOfFirstNonzeroCoefficient(result) == -1) {
            // Equation1 is equivalent to Equation2
            return simplify(equation1);
        }
        result = simplify(result);
        return result;
    }
    /*
     * / 1a + 2b + 3c = 6
     * | 2a + 5b + 5c = 12
     * \ 3a + 1b + 9c = 13
     *
     * system:
     * [
     *   [1, 2, 3, 6], 
     *   [2, 5, 5, 12], 
     *   [3, 1, 9, 13], 
     * ]
     */
    public static Fraction[] solve(int[][] system) {
        int equationNumber = system.length;
        int unknownNumber = system[0].length - 1;
        boolean[] used;
        Fraction[] result = new Fraction[unknownNumber];
        
        // Each cycle gets a value of an unknown
        for(int lastUnknownIndex = unknownNumber - 1; lastUnknownIndex != -1; --lastUnknownIndex) {
            used = new boolean[equationNumber];
            
            // Each cycle eliminates an unknown
            for(int j = 0; j != lastUnknownIndex; ++j) {
                // Get the equations with the unknown to eliminate
                ArrayList<Integer> available = new ArrayList<>();
                for(int k = 0; k != equationNumber; ++k) {
                    if(!used[k] && system[k][j] != 0) {
                        available.add(k);
                    }
                }
                
                // Merge the first available equation with other available equations
                if(!available.isEmpty()) {
                    int firstEquation = available.get(0);
                    for(int k = 1; k < available.size(); ++k) {
                        int otherEquation = available.get(k);
                        system[otherEquation] = merge(system[firstEquation], system[otherEquation]);
                    }
                    used[firstEquation] = true;
                }
            }
            
            mergeWithSolvedEquation(system, result);
        }
        return result;
    }
}
