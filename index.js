let detail = {
  name: "Jane appleseed",
  number: "0000 0000 0000 0000",
  month: "00",
  year: "00",
  cvc: "000",
};

Object.keys(detail).forEach((key) =>
  document
    .querySelector(`input[name=${key}]`)
    .addEventListener("keyup", validate)
);

function validate(field) {
  let input =
    typeof field === "object"
      ? field.target
      : document.querySelector(`input[name=${field}]`);

  const label = input.closest("label");
  const errorSection = label.querySelector("span.show");

  if (input.value.trim() === "") {
    errorSection.innerText = "Can't be blank";
    label.classList.add("error");
    return false;
  }

  if (
    (input.name === "number" && !Number(input.value)) ||
    ((input.name === "month" || input.name === "year") && !Number(input.value))
  ) {
    errorSection.innerText = "Wrong format, numbers only";
    label.classList.add("error");
    return false;
  }

  let length = 0;
  const numberInputName = ["number", "month", "year", "cvc"];

  if (input.name === "number") length = 16;
  if (input.name === "month" || input.name === "year") length = 2;
  if (input.name === "cvc") length = 3;

  if (
    numberInputName.includes(input.name) &&
    (Number(input.value).toString().length < length ||
      Number(input.value).toString().length > length)
  ) {
    errorSection.innerText = `Need ${length} digit number`;
    label.classList.add("error");
    return false;
  }

  label.classList.remove("error");
  return true;
}

const button = document.querySelector("button");

window.addEventListener(
  "keyup",
  () => (button.disabled = !Object.keys(detail).every(validate))
);

window.addEventListener("submit", (e) => {
  e.preventDefault();

  Object.keys(detail).forEach((field) => {
    detail[field] = document.querySelector(`input[name=${field}]`).value;
    document.querySelector(`input[name=${field}]`).value = "";
  });

  Object.keys(detail).forEach(
    (field) =>
      (document.querySelector(`span.${field}`).innerText = detail[field])
  );

  const formState = document.querySelector(".form");
  const completeState = document.querySelector(".complete");

  if (formState.classList.contains("show")) {
    document.querySelector(".form").classList.remove("show");
    document.querySelector(".complete").classList.add("show");
    return;
  }

  if (completeState.classList.contains("show")) {
    document.querySelector(".complete").classList.remove("show");
    document.querySelector(".form").classList.add("show");

    detail = {
      name: "Jane appleseed",
      number: "0000 0000 0000 0000",
      month: "00",
      year: "00",
      cvc: "000",
    };

    Object.keys(detail).forEach(
      (field) =>
        (document.querySelector(`span.${field}`).innerText = detail[field])
    );
  }
});

button.disabled = !Object.keys(detail).every(validate);
