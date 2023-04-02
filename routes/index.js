const router = require("express").Router();
const { Hospital, Overview } = require("../models");
const hospitalPanel = require("express").Router({ mergeParams: true });
var passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const { hashPassword } = require("../lib/passwordUtils");

router.use("/hospitalpanel", connectEnsureLogin.ensureLoggedIn(), hospitalPanel);

router.get("/", (request, response) => {
  response.render("index")
});

router.get("/signup", (request, response) => {
  response.render("signup", {
    title: "Sign Up",
  });
});

router.get("/login", (request, response) => {
  response.render("login", {
    title: "Login",
  });
});

// Sign Out or Log out route
router.get("/signout", (request, response, next) => {
  request.logout((err) => {
    if (err) {
      return next(err);
    }
    request.flash("error", "Logged Out Successfully");
    response.redirect("/");
  });
});

/* Register hospital */
router.post("/signup", async (request, response) => {
  try {
    if (request.body.password.length < 1) {
      throw new Error("Password cannot be empty");
    }
    const passwordHash = await hashPassword(request.body.password);
    const hospital = await Hospital.addHospital({
      hospitalName: request.body.firstName,
      address: request.body.lastName,
      email: request.body.email,
      passwordHash,
      phone: request.body.phone,
      registrationId: request.body.registrationId
    });
    request.login(hospital, (err) => {
      if (err) {
        console.log(err);
      }
      response.redirect("/hospitalpanel");
    });
  } catch (error) {
    request.flash("error", error.message);
    if (error.message == "Email is already registered") {
      return response.redirect("/login");
    } else return response.redirect("/signup");
  }
});

/* Login or Authenticate Hospital */
router.post("/login", passport.authenticate("local-user", {
  failureRedirect: "/login"
}), (request, response) => {
  response.redirect("/hospitalpanel")
});

/* Hospital Panel Routes */

hospitalPanel.get("/", async(request, response) => {
  try {
    const hospitaOverview = await Overview.findOne({where: {hospitalID: request.user.id}})
    if (hospitaOverview == null) {
      return response.render("hospitalPanel", {
        title: "Hospital Panel",
        overviewData: false
      });
    }
    response.render("hospitalPanel", {
      title: "Hospital Panel",
      overviewData: true,
      generalBed: hospitaOverview.generalBed,
      ventilator: hospitaOverview.ventilator,
      icuBed: hospitaOverview.icuBed,
      occupiedGeneralBed: hospitaOverview.occupiedGeneralBed,
      occupiedIcuBed: hospitaOverview.occupiedIcuBed,
      occupiedVentilator: hospitaOverview.occupiedVentilator
    });
  } catch (error) {
    request.flash("error", error.message);
    console.log(error);
  }
})

/* Update Total Data */
hospitalPanel.post("/total-data", async(request, response) => {
  try {
    const hospitaOverview = await Overview.findOne({where: {hospitalID: request.user.id}})
    console.log(request.body);
    if (hospitaOverview == null) {
      await Overview.addTotal({
        generalBed: request.body.generalBed,
        icuBed: request.body.icuBed,
        ventilator: request.body.ventilator,
        hospitalID: request.user.id
      })
    } else {
      console.log("Updating total");
      if (request.body.generalBed.length !== 0) {
        await Overview.updateGeneralBed({generalBed: request.body.generalBed, hospitalID: request.user.id})
      }
      if (request.body.icuBed.length !== 0) {
        await Overview.updateIcuBed({icuBed: request.body.icuBed, hospitalID: request.user.id})
      }
      if (request.body.ventilator.length !== 0) {
        await Overview.updateVentilator({ventilator: request.body.ventilator, hospitalID: request.user.id})
      }
    }
    request.flash("success", "Added")
    response.redirect("/hospitalpanel")
  } catch (error) {
    request.flash("error", error.message);
    console.log(error);
  }
})

hospitalPanel.post("/occupancy-update", async(request, response) => {
  try {
    const hospitaOverview = await Overview.findOne({where: {hospitalID: request.user.id}})
    if (hospitaOverview == null) {
      await Overview.addOccupancy({
        occupiedGeneralBed: request.body.occupiedGeneralBed,
        occupiedIcuBed: request.body.occupiedIcuBed,
        occupiedVentilator: request.body.occupiedVentilator,
        hospitalID: request.user.id
      })
    } else {
      console.log("Updating occupancy");
      if (request.body.occupiedGeneralBed.length !== 0) {
        await Overview.updateOccupiedGeneralBed({occupiedGeneralBed: request.body.occupiedGeneralBed, hospitalID: request.user.id})
      }
      if (request.body.occupiedIcuBed.length !== 0) {
        await Overview.updateOccupiedIcuBed({occupiedIcuBed: request.body.occupiedIcuBed, hospitalID: request.user.id})
      }
      if (request.body.occupiedVentilator.length !== 0) {
        await Overview.updateOccupiedVentilator({occupiedVentilator: request.body.occupiedVentilator, hospitalID: request.user.id})
      }
    }
    request.flash("success", "Updated Occupancy")
    response.redirect("/hospitalpanel")
  } catch (error) {
    request.flash("error", error.message);
    console.log(error);
  }
})

module.exports = router;