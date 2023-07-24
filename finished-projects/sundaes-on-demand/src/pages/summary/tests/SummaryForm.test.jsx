import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test('Initial Conditions button should be disable until user accept the conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {name: /I agree to/i});
  const button = screen.getByRole('button', {name: /Confirm order/i});

  // checkbox should be unchecked and button should be disabled
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('Checkbox enables button on first click and then disable button on second click', async () => {
  const user = userEvent.setup();
  
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {name: /I agree to/i});
  const button = screen.getByRole('button', /Confirm order/i);
  
  await user.click(checkbox);

  // after clicking the checkbox, checkbox should be checked and button should be enabled
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();

  await user.click(checkbox);

  // checkbox should be unchecked and button should be disabled
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(/No ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument()

  // popover appears on mouseover of checkbox label
  const termsAndCondition = screen.getByText(/Terms and Conditions/i);
  
  await user.hover(termsAndCondition);
  const popover = screen.getByText(/No ice cream will actually be delivered/i);

  expect(popover).toBeInTheDocument();

  // popover disappear when we mouse out
  await user.unhover(termsAndCondition);
  expect(popover).not.toBeInTheDocument();
});

// test("Initial conditions", () => {
//   render(<SummaryForm />);
//   const checkbox = screen.getByRole("checkbox", {
//     name: /terms and conditions/i,
//   });
//   expect(checkbox).not.toBeChecked();

//   const confirmButton = screen.getByRole("button", { name: /confirm order/i });
//   expect(confirmButton).toBeDisabled();
// });

// test("Checkbox enables button on first click and disables on second click", async () => {
//   const user = userEvent.setup();

//   render(<SummaryForm />);
//   const checkbox = screen.getByRole("checkbox", {
//     name: /terms and conditions/i,
//   });
//   const confirmButton = screen.getByRole("button", { name: /confirm order/i });

//   await user.click(checkbox);
//   expect(confirmButton).toBeEnabled();

//   await user.click(checkbox);
//   expect(confirmButton).toBeDisabled();
// });

// test("popover responds to hover", async () => {
//   const user = userEvent.setup();
//   render(<SummaryForm />);

//   // popover starts out hidden
//   const nullPopover = screen.queryByText(
//     /no ice cream will actually be delivered/i
//   );
//   expect(nullPopover).not.toBeInTheDocument();

//   // popover appears on mouseover of checkbox label
//   const termsAndConditions = screen.getByText(/terms and conditions/i);
//   await user.hover(termsAndConditions);
//   const popover = screen.getByText(/no ice cream will actually be delivered/i);
//   expect(popover).toBeInTheDocument();

//   // popover disappears when we mouse out
//   await user.unhover(termsAndConditions);
//   expect(popover).not.toBeInTheDocument();
// });
