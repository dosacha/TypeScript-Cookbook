// person.cjs.d.ts
export interface Person {
  name: string;
  age: number;
}
export function printPerson(person: Person): void;