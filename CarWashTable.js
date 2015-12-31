/**
 * Created by Chaika Evgeniy on 19.10.15.
 */
var confiq = {
    arrBlackList: ["ford", "hyundai"],
    arrWashCar: ["bmw", "opel", "toyota", "ferrari", "honda",
        "mercedes", "lanos", "chevrolet", "nissan", "mitsubishi", "lexus"],
    arrWashCarColor: ["yellow", "black", "white", "brown", "red", "green", "blue", "orange", "gray", "cyan"],
    currentDate: moment().format("D.MM.YYYY"),
    yearWashLimit: 2,
    daysMasterAmount: 4,
    arrMasterView: [''],
    somePerson: ""
};


function CustomError(m) {
    this.message = m;
}

CustomError.prototype = new Error();

function validationName(text) {
    if ((typeof text == "string") && (text[0] < "a")) {
        return text;
    } else {
        return false;
    }
}
function validationPhone(phoneNumber) {

    if (typeof phoneNumber == "number") {
        var leng = phoneNumber.toString();
        if (leng.length == 12) {
            return phoneNumber;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
function validationCarBrand(carBrand) {
    if (typeof carBrand == "string") {
        for (var j = 0; j < confiq.arrBlackList.length; j++) {
            if (confiq.arrBlackList.indexOf(carBrand) >= 0) {
                console.log("Hyundai and Ford do not wash!");
                return false;
            }
        }
        for (var p = 0; p < confiq.arrWashCar.length; p++) {
            if (confiq.arrWashCar.indexOf(carBrand) >= 0) {
                if (carBrand == confiq.arrWashCar[p])
                    return carBrand;
            } else {
                console.log("Wrong input!We wash the car just listed!");
                return false;
            }
        }
    } else {
        console.log("Wrong input!Enter the string!");
        return false;
    }
}
function validationCarYear(carYear) {
    if (typeof carYear != "object") {
        return false;
    }
    var carYearStr = carYear.format("YYYY").toString();
    if (carYearStr.length != 4) {
        return false;
    }

    var oldYear = moment("1980", "YYYY").format("YYYY").toString();

    if (carYearStr < oldYear) {
        console.log("Cars under 1980 not wash!");
        return false;
    }
    var nowYear = moment().format("YYYY").toString();
    if (carYearStr > nowYear) {
        console.log("Machines from the future is not wash!");
        return false;
    }
    return carYear;
}

function validationCarColor(carColor) {
    if (typeof carColor != "string") {
        return false;
    }
    for (var h = 0; h < confiq.arrWashCarColor.length; h++) {
        if (confiq.arrWashCarColor.indexOf(carColor) >= 0) {
            if (carColor == confiq.arrWashCarColor[h]) {
                return carColor;
            }
        } else {
            console.log("Wash car just listed colors!");
            return false;
        }
    }
}


function validationWashDate(date) {
    if (typeof date != "object") {
        return false;
    }
    var nowDate = moment();

    var userYear = date.format("YYYY");
    var limYear = moment().add(2, "year").format("YYYY");


    if (date < nowDate) {
        console.log("At last, an application for cleaning do not accept!");
        return false;
    }
    if (userYear > limYear) {
        console.log("We accept applications only on the earlier date!");
        return false;
    }
    return date;
}
function validationWashTime(time) {
    var time1 = time.format('H:mm');
    var timeLimitStart = "8:00";
    var timeLimitStop = "23:00";
    if ((time1 < timeLimitStart) && (time1 > timeLimitStop)) {
        console.log("We work from 8:00 to 23:00");
        return false;
    } else {
        return time;
    }
}
function sortArray(arr) {   // bubble search
    for (var barrier = arr.length - 1; barrier >= 0; barrier--) {
        for (var index = 0; index < barrier; index++) {
            if ((arr[index].dateWash).diff(arr[index + 1].dateWash) > 0) {
                var tmp = arr[index];
                arr[index] = arr[index + 1];
                arr[index + 1] = tmp;
            }
        }
    }

}
//-----------MODEL-----------
//--------constructor User---------------
function Person() {
}
Person.prototype.setPersonName = function (first, last) {
    this.firstnamePer = first;
    this.lastnamePer = last;
};
function User(firstname, lastname, phonenumber, carBrand, carYear, carColor, date, time) {
    Person.apply(this, arguments);
    this.firstnameUser = firstname;
    this.lastnameUser = lastname;
    this.phonenumberUser = phonenumber;
    this.carBrand = carBrand;
    this.carColor = carColor;
    this.carWashYear = moment(carYear, "YYYY");
    this.dateWash = moment(date, "D.MM.YYYY");
    this.timeWash = moment(time, "H:mm");

}
User.prototype = new Person();
User.prototype.getUserFirstName = function () {
    return this.firstnameUser;
};
User.prototype.getUserLastName = function () {
    return this.lastnameUser;
};
User.prototype.getFullNameUser = function () {
    return this.firstnameUser + " " + this.lastnameUser;
};
User.prototype.getCarYearUser = function () {
    return this.carWashYear.format('YYYY');
};
User.prototype.getDateWash = function () {
    return this.dateWash.format("D.MM.YYYY");
};
User.prototype.getTimeWash = function () {
    return this.timeWash.format('H:mm');
};
User.prototype.getUserInfoForMaster = function () {
    return "<blockquote><p>Owner : " + this.getFullNameUser() + "</p>" +
        "<p>Phone : +" + this.phonenumberUser + "</p>" +
        "<p>Brand : " + this.carBrand + "</p>" +
        "<p>Color : " + this.carColor + "</p>" +
        "<p>Year of issue : " + this.getCarYearUser() + "</p>" +
        "<p>Time : " + this.getTimeWash() + "</p></blockquote>";
};

//-----------------constructor Master-------------
function Master() {
}
Master.prototype.getViewDays = function (array) {

    for (var i = 0; i < confiq.daysMasterAmount; i++) {
        confiq.arrMasterView[i] = " no applications.";
    }
    var arrD = [];
    for (var k = 0; k < confiq.daysMasterAmount; k++) {
        arrD[k] = moment().add(k, 'days').format("D.MM.YYYY");
    }
    for (var s = 0; s < arrD.length; s++) {
        for (var j = 0; j < array.length; j++) {
            if (arrD[s] == array[j].dateWash.format("D.MM.YYYY")) {
                confiq.arrMasterView[s] = array[j];
                break;
            }
        }
    }
};

function templateMaster() {
    var result = "<h2>Output for the master</h2><hr><br><h3>Applications for the next " + confiq.daysMasterAmount + " day.</h3>";

    for (var i = 0; i < confiq.arrMasterView.length; i++) {
        if (confiq.arrMasterView[i] instanceof User) {
            result += "<div>On " + moment().add(i, 'days').format("D.MM.YYYY")
                + " application " + confiq.arrMasterView[i].getUserInfoForMaster() + ".</div>";
        } else {
            result += "<div>On " + moment().add(i, 'days').format("D.MM.YYYY") +
                confiq.arrMasterView[i] + ".</div>";
        }
    }
    return result;
}
//-----------------------Templates------------------
function templateAdmin(arr) {
    if (arr instanceof Array) {
        var res = "<h2>Output for the Administrator</h2><hr>" +
            "<table>" +
            "<caption><h3>List of registered customers</h3></caption><br><th></th>";
        for (var k in arr[0]) {
            if (arr[0].hasOwnProperty(k)) {
                switch (k) {
                    case "firstnameUser":
                        res += "<th>Firstname</th>";
                        break;
                    case "lastnameUser":
                        res += "<th>Lastname</th>";
                        break;
                    case "phonenumberUser":
                        res += "<th>Phone</th>";
                        break;
                    case "carBrand":
                        res += "<th>Brand</th>";
                        break;
                    case "carColor":
                        res += "<th>Color</th>";
                        break;
                    case "carWashYear":
                        res += "<th>Year of issue</th>";
                        break;
                    case "dateWash":
                        res += "<th>Date</th>";
                        break;
                    case "timeWash":
                        res += "<th>Time</th>";
                        break;
                    default :
                        res += "Something went wrong!";
                        break;
                }
            }
        }
        for (var n = 0; n < arr.length; n++) {
            res += "<tr>";
            res += "<th>" + (n + 1) + "</th>";

            for (var b in arr[n]) {
                if (arr[n].hasOwnProperty(b)) {
                    if (arr[n][b] == arr[n].carWashYear) {
                        res += "<td align='center'>" + arr[n].getCarYearUser() + " </td>";
                    } else if (arr[n][b] == arr[n].dateWash) {
                        res += "<td align='center'>" + arr[n].getDateWash() + " </td>";
                    } else if (arr[n][b] == arr[n].timeWash) {
                        res += "<td align='center'>" + arr[n].getTimeWash() + " </td>";
                    } else {
                        res += "<td> " + arr[n][b] + " </td>";
                    }
                }
            }
        }
        res += "</tr></table>";
    }
    return res;
}
function templateUserN() {

    if (confiq.somePerson instanceof Person) {
        var relt = "<h2>Output for the User</h2><hr><br><div>Registered user "
            + confiq.somePerson.getFullNameUser() + " washing up left "
            + (confiq.somePerson.dateWash.diff(moment(), 'days') + 1) + " days.</div><br><br>";
    }
    return relt;
}
//-------------------VIEW------------------------

function View() {
}

View.prototype.draw = function (any) {
    window.onload = function () {
        var buttonAdmin = document.getElementById("admin");
        buttonAdmin.onclick = handleButtonClickAdmin;
        var buttonMaster = document.getElementById("master");
        buttonMaster.onclick = handleButtonClickMaster;
        var buttonUser = document.getElementById("user");
        buttonUser.onclick = handleButtonClickUser;
    };

    function handleButtonClickAdmin() {
        document.getElementById("content").innerHTML = templateAdmin(any);
    }

    function handleButtonClickMaster() {
        document.getElementById("content").innerHTML = templateMaster();
    }

    function handleButtonClickUser() {
        document.getElementById("content").innerHTML = templateUserN();
    }

    return "";
};

//-------------------CONTROLLER----------------

function Controller() {
    this.model = [];
    this.view = new View();
    this.master = new Master();

}


Controller.prototype.registrationUser = function (user) {

    if (user instanceof User) {
    } else {
        throw new CustomError("Only for register users!");
    }
    if ((!validationName(user.firstnameUser)) || (!validationName(user.lastnameUser))) {
        throw new CustomError("Wrong input line!Need a line that begins with " +
            "a capital letter!" + user.getFullNameUser() +
            " not registered!");
    }
    if (!validationPhone(user.phonenumberUser)) {
        throw new CustomError("Invalid phone number!" + user.getFullNameUser() +
            " not registered!");
    }

    if (!validationCarBrand(user.carBrand)) {
        throw new CustomError(user.getFullNameUser() + " not registered!" +
            "Enter the correct machine model!");
    }
    if (!(validationCarYear(user.carWashYear))) {
        throw new CustomError(user.getFullNameUser() + " not registered!" +
            "Enter the correct year of manufacture of the machine!");
    }
    if (!(validationCarColor(user.carColor))) {
        throw new CustomError(user.getFullNameUser() + " not registered!" +
            "Enter the correct color machine!");
    }
    if (!(validationWashDate(user.dateWash))) {
        throw new CustomError(user.getFullNameUser() + " not registered!" +
            "Enter the correct date car wash!");
    }
    if (!(validationWashTime(user.timeWash))) {
        throw new CustomError(user.getFullNameUser() + " not registered!" +
            "Enter the correct time car wash!");
    }


    for (var k = 0; k < this.model.length; k++) {
        if (user.getDateWash().toString() == this.model[k].getDateWash().toString()) {
            throw new CustomError("User " + user.getFullNameUser()
                + " not registered. Recording on " + user.getDateWash() + " already done!");
        }
    }

    this.model.push(user);
};


Controller.prototype.addUserWash = function (first, last, phone, brand, year, color, date, time) {

    try {
        var user = new User(first, last, phone, brand, year, color, date, time);
        this.registrationUser(user);
    } catch (e) {
        if (e instanceof CustomError) {
            console.log(e.message);
        }
    }


};
Controller.prototype.searchNameUser = function (first, last) {
    var user = new Person();
    user.setPersonName(first, last);
    for (var i = 0; i < this.model.length; i++) {
        if ((this.model[i].getUserFirstName() == user.firstnamePer )
            && (this.model[i].getUserLastName() == user.lastnamePer)) {
            confiq.somePerson = this.model[i];
        }
    }
};


Controller.prototype.drawDataUser = function (container) {
    sortArray(this.model);
    this.master.getViewDays(this.model);

    container.innerHTML = this.view.draw(this.model);
};

//----------------APPLICATION---------------------
function Application() {
    this.container = document.body;
    this.controller = new Controller();
}

Application.prototype.addSomeUser = function (firstnameUser, lastnameUser, phonenumberUser, carColor,
                                              carBrand, carWashYear, dateWash, timeWash) {
    this.controller.addUserWash(firstnameUser, lastnameUser, phonenumberUser, carColor, carBrand,
        carWashYear, dateWash, timeWash);
};
Application.prototype.repUserDate = function (firstname, lastname) {
    this.controller.searchNameUser(firstname, lastname);
};


Application.prototype.viewMaster = function () {
    this.controller.drawDataUser(this.container);
};
Application.prototype.viewAdmin = function () {
    this.controller.drawDataUser(this.container);
};


Application.prototype.viewUserDate = function () {
    this.controller.drawDataUser(this.container);
};


var app = new Application();
app.addSomeUser("Zheka", "Chaika", 380669944567, "lexus", 1996, "red", '2.10.2015', '8:35');
app.addSomeUser("Zhehjk", "Chaika", 380664884567, "lexus", 1996, "red", '4.11.2015', '8:35');
app.addSomeUser("Zhe", "Chaika", 380667844567, "lexus", 1996, "red", '3.12.2015', '8:35');
app.addSomeUser("Zhekaghj", "Chaika", 380669994567, "bmw", 1996, "red", '3.01.2016', '8:35');
app.addSomeUser("Zhekaf", "Chaika", 380662224567, "ferrari", 1996, "red", '4.01.2016', '8:35');
app.addSomeUser("Zhekaj", "Chaika", 380661144567, "lexus", 1980, "red", '29.11.2015', '2:35');
app.addSomeUser("Zhekag", "Chaika", 380664411567, "bmw", 1996, "red", '26.10.2016', '8:37');
app.viewAdmin();
app.viewMaster();

app.repUserDate("Zhekag", "Chaika");
app.viewUserDate();