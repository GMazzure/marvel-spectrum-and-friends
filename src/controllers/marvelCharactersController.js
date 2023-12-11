

const getUsers = (req, res) => {

  

    this.userService.getUsers().then((users) => {
      res.send(users);
    });
}