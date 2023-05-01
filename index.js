//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function (e) {
  e.preventDefault();
  // if (animating) return false;
  animating = true;
  current_fs = $(this).parent().parent();
  next_fs = $(this).parent().parent().next();

  console.log(next_fs);
  // const err = 0;

  const err = validate(this.parentElement.parentElement.id);

  console.log(err);
  console.log(!err);

  //activate next step on progressbar using the index of next_fs
  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  //show the next fieldset
  // if (err == 0) exit();
  // if (!err) {
  console.log(this.type);

  if (err == 0) {
    // if (this.type == "submit") document.querySelector("form").submit();
    next_fs.show();
    // if (this.type == "submit") document.querySelector("form").submit();
    // }
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = now * 50 + "%";
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({
            transform: "scale(" + scale + ")",
            position: "absolute",
          });
          next_fs.css({ left: left, opacity: opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: "easeInOutBack",
      }
    );
  }
});

$(".previous").click(function () {
  // if (animating) return false;
  animating = true;

  current_fs = $(this).parent().parent();

  previous_fs = $(this).parent().parent().prev();

  //de-activate current step on progressbar
  $("#progressbar li")
    .eq($("fieldset").index(current_fs))
    .removeClass("active");

  //show the previous fieldset

  //hide the current fieldset with style
  current_fs.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale previous_fs from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take current_fs to the right(50%) - from 0%
        left = (1 - now) * 50 + "%";
        //3. increase opacity of previous_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({ left: left });
        previous_fs.css({
          transform: "scale(" + scale + ")",
          opacity: opacity,
        });
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: "easeInOutBack",
    }
  );
  previous_fs.show();
});

function validate(field) {
  let error = 0;
  console.log(field);
  if (field == "field1") {
    let nameErr = 0;
    let emailErr = 0;
    let phoneErr = 0;

    const first_user_name = document.querySelector("[name='name']");
    const first_user_email = document.querySelector("[name='email']");
    const first_user_phone = document.querySelector("[name='phone']");

    if (first_user_name.value == "") {
      first_user_name.classList.add("error");
      first_user_name.nextElementSibling.classList.remove("display-none");
      nameErr = 1;
    } else {
      nameErr = 0;
      first_user_name.classList.remove("error");
      first_user_name.nextElementSibling.classList.add("display-none");
    }

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!first_user_email.value.match(mailformat)) {
      first_user_email.classList.add("error");
      first_user_email.nextElementSibling.classList.remove("display-none");
      emailErr = 1;
    } else {
      emailErr = 0;
      first_user_email.classList.remove("error");
      first_user_email.nextElementSibling.classList.add("display-none");
    }

    let phoneno = /^\d{10}$/;
    if (!first_user_phone.value.match(phoneno)) {
      first_user_phone.classList.add("error");
      first_user_phone.nextElementSibling.classList.remove("display-none");
      phoneErr = 1;
    } else {
      phoneErr = 0;
      first_user_phone.classList.remove("error");
      first_user_phone.nextElementSibling.classList.add("display-none");
    }

    if (nameErr == 1 || emailErr == 1 || phoneErr == 1) error = 1;
  } else if (field == "field2") {
    console.log(document.querySelector("[name='green-card']:checked"));
    if (document.querySelector("[name='green-card']:checked")) {
      error = 0;
      document
        .querySelector("#green-card-row")
        .nextElementSibling.classList.add("display-none");
    } else {
      error = 1;
      document
        .querySelector("#green-card-row")
        .nextElementSibling.classList.remove("display-none");
    }
  } else if (field == "field3") {
    if (document.querySelector("[name='green-card-holder5']:checked")) {
      error = 0;
      document
        .querySelector("#green-card-holder5-row")
        .nextElementSibling.classList.add("display-none");
    } else {
      error = 1;
      document
        .querySelector("#green-card-holder5-row")
        .nextElementSibling.classList.remove("display-none");
    }
  } else if (field == "field4") {
    if (document.querySelector("[name='green-card-arrested']:checked")) {
      error = 0;
      document
        .querySelector("#green-card-arrested-row")
        .nextElementSibling.classList.add("display-none");
    } else {
      error = 1;
      document
        .querySelector("#green-card-arrested-row")
        .nextElementSibling.classList.remove("display-none");
    }
  } else if (field == "field5") {
    if (document.querySelector("[name='federal-state-tax']:checked")) {
      error = 0;
      document
        .querySelector("#federal-state-tax-row")
        .nextElementSibling.classList.add("display-none");
    } else {
      error = 1;
      document
        .querySelector("#federal-state-tax-row")
        .nextElementSibling.classList.remove("display-none");
    }
  } else if (field == "field6") {
    if (document.querySelector("[name='child-support']:checked")) {
      error = 0;
      document
        .querySelector("#child-support-row")
        .nextElementSibling.classList.add("display-none");
    } else {
      error = 1;
      document
        .querySelector("#child-support-row")
        .nextElementSibling.classList.remove("display-none");
    }
  } else if (field == "field7") {
    let years5error = 0;
    let months6error = 0;
    // const morethan6month = document.querySelector("#more-than-6-months-row");
    console.log(document.querySelector("[name='outside-us']:checked"));
    if (!document.querySelector("[name='outside-us']:checked")) {
      document.querySelector("#field7error").classList.remove("display-none");
      years5error = 1;
    } else {
      document.querySelector("#field7error").classList.add("display-none");
      years5error = 0;
      if (
        document.querySelector("[name='outside-us']:checked").value == "yes"
      ) {
        if (!document.querySelector("[name='outside-us6-month']:checked")) {
          document
            .querySelector("#field7error")
            .classList.remove("display-none");
          months6error = 1;
        } else {
          document.querySelector("#field7error").classList.add("display-none");
          months6error = 0;
        }
      }
    }
    if (years5error == 1 || months6error == 1) error = 1;
  }

  // error=0;

  return error;
}

document.querySelectorAll("[name='outside-us']").forEach((a) =>
  a.addEventListener("click", () => {
    // if(document.querySelector('[name="outside-us"]'))
    if (document.querySelector("[name='outside-us']:checked").value == "yes") {
      document
        .querySelector("#more-than-6-months-row")
        .classList.remove("display-none");
    } else {
      document
        .querySelector("#more-than-6-months-row")
        .classList.add("display-none");
    }
  })
);
