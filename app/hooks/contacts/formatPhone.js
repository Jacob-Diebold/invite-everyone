export default function formatPhone(label, digits) {
  let setLabel = "";
  let setNumber = digits.trim();
  if (!label || label == undefined) setLabel = "Phone: ";
  else {
    setLabel = label.trim();
    setLabel = `${toTitleCase(setLabel)}: `;
  }

  if (digits[0] == "+") {
    setNumber = digits.slice(1);
  }
  if (setNumber.length === 11 && setNumber[0] == "1") {
    setNumber = setNumber.slice(1);
  }
  if (setNumber.length === 10) {
    const areaCode = setNumber.slice(0,3)
    const second = setNumber.slice(3,6)
    const third = setNumber.slice(6,10)
    setNumber = (`(${areaCode})${second}-${third}`)
  } else if (setNumber.length === 7) {
    const first = setNumber.slice(0,3)
    const second = setNumber.slice(3,7)
    setNumber = `${first}-${second}`
  }

  

  return {label: setLabel, phone: setNumber, display: (setLabel + setNumber)}
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
