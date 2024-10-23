class User {
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
    constructor (username,password,email,role,id) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._email = email;
        this._role = role;

    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }
}