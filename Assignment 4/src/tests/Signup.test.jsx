import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "../Signup";
import "@testing-library/jest-dom";

describe("Signup Component", () => {
  test("renders the Signup form with all fields and button", () => {
    render(<Signup />);

    expect(screen.getByText("SignUp")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  test("shows error message if fields are empty when submitting", () => {
    render(<Signup />);

    const signUpButton = screen.getByRole("button", { name: "Sign up" });

    fireEvent.click(signUpButton);

    expect(screen.getByText("All fields are required!")).toBeInTheDocument();
  });

  test("shows error message if passwords do not match", () => {
    render(<Signup />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password456" },
    });

    const signUpButton = screen.getByRole("button", { name: "Sign up" });
    fireEvent.click(signUpButton);

    expect(screen.getByText("Passwords do not match!")).toBeInTheDocument();
  });

  test("submits successfully if all fields are correctly filled", () => {
    render(<Signup />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });

    const signUpButton = screen.getByRole("button", { name: "Sign up" });
    fireEvent.click(signUpButton);

    expect(console.log).toHaveBeenCalledWith("User has successfully signed up");
  });

  test("login link is present and clickable", () => {
    render(<Signup />);
    const loginLink = screen.getByText("Login");

    expect(loginLink).toBeInTheDocument();
    fireEvent.click(loginLink);
  });
});
