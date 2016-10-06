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
 * A class for balancing chemical equations.
 * @author otaku
 * @version 1.0
 */
public abstract class ChemicalEquationBalancer {
    public static String balance(String equ) {
        int[][] system = ChemicalEquationParser.toSystem(equ);
        Fraction[] fs = LinearEquationSystemSolver.solve(system);
        int[] solution = SimpleMath.getRatio(fs);
        return ChemicalEquationParser.apply(equ, solution);
    }
}
