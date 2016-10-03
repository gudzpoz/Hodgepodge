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
package org.eu.gudzpoz;

import java.util.Objects;

/**
 *
 * @author GuDzpoz
 */
public class Monomial {
    public class VariableMismatchException extends Exception {
        public VariableMismatchException() {
            super();
        }
        public VariableMismatchException(String message) {
            super(message);
        }
    }
    char[] variables;
    int coefficient;
    
    public Monomial(String monomialString) {
        
    }
    
    public Monomial mergesWith(Monomial element) throws VariableMismatchException {
        if(this.name.equals(element.name)) {
            return new Monomial(this.name, this.coefficient + element.coefficient);
        }
        else {
            throw new VariableMismatchException();
        }
    }
    
    @Override
    public int hashCode() {
        return this.name.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Monomial other = (Monomial) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        return true;
    }
}
