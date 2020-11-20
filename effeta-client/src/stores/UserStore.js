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
    setMembers(loadedMembers) {
      this.members = loadedMembers;
    },
    addMember(member) {
      this.members = [...this.members, member];
    },
    modifyMember(member) {
      this.members = this.members.map(mem => {
        if (mem.id !== member.id) {
          return mem;
        } else {
          return {...member};
        }
      });
    },
    removeMember(memberId) {
      this.members = this.members.filter(member => member.id !== memberId);
    }
  }
}
