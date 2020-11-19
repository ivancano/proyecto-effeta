function createData(id, name, lastname, email, address, phone, dni) {
  return { id, name, lastname, email, address, phone, dni };
}

const members = [];

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
