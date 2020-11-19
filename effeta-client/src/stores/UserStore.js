function createData(id, name, lastName, email, address, phone) {
  return { id, name, lastName, email, address, phone };
}

const members = [
  createData('1', 'Janice Monahan', 'Koch', 'janicemo@gmail.com', 'Port Beulah, Iowa 90719, USA', '969-068-8439'),
  createData('2', 'Rollin Fadel', 'Steuber', 'Rollin_Fadel@gmail.com', 'Lake Matilde, Tennesses 74062, USA', '(017) 057-6055'),
  createData('3', 'Lera Stroman', 'Konopelski', 'Lera_Stroman3@gmail.com', 'Vicentaview, Mississippi 47576-9639, USA', '166-619-2267'),
  createData('4', 'Adan Schiller', 'Harber', 'Adan_Schiller10@yahoo.com', 'VonRuedenberg, Delaware 99072-4003, USA', '(699) 824-5724'),
];

export function createUserStore() {
  return {
    user: {},
    members: members,
    setUser(user) {
      this.user = user;
    },
    logoutUser() {
      this.user = {};
    },
    addMember(member) {
      this.members = [...this.members, member];
    },
    removeMember(newMember) {
      this.members = this.members.filter(member => member.id !== newMember.id);
    }
  }
}
