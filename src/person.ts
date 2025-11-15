// person.ts
type Person = {
    name: string;
    age: number;
};

function printPerson(person: Person){
    console.log(person.name);
}