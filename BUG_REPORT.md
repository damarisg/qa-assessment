# Bug Report — [SauceDemo E-Commerce]

## B-001 · Access blocked with no possibility of account recovery

- **Severity:** Medium 
- **User(s) affected:** U2 (username: `locked_out_user`/ password: `secret_sauce!`)
- **Environment:** Firefox (150.0.3), Windows (11 Home - 25H2)
- **Author:** Seyla Gomez 

### Steps to Reproduce
1. Go to the login page
2. Enter username/password with U2
3. Click the "Login" button

### Expected Result
4. Displays an error message
5. Displays the password recovery option

### Actual Result
4. Displays an error message
5. Does not display the password recovery option
6. Displays errors in the console

### Evidence
![error-screenshot](https://drive.google.com/uc?export=view&id=13LRGafhFoQcKi3uFZnl9DkM5VEUBT7Z9)

### Notes
Users with blocked accounts have no recovery path, which may lead to permanent account loss

---

## B-002 · All products have the same cover image

- **Severity:** High
- **User(s) affected:** U3 (username: `problem_user`/ password: `secret_sauce!`)
- **Environment:** Firefox (150.0.3), Windows (11 Home - 25H2)
- **Author:** Seyla Gomez 

### Steps to Reproduce
1. Go to the login page
2. Enter username/password with U3
3. Click on "Login" button
4. Navigate to /inventory.html and observe the product list

### Expected Result
4. The product list in /inventory.html is displayed with the corresponding image for each product

### Actual Result
4. The product list in /inventory.html is displayed with the same image for each product

### Evidence
![error-screenshot](https://drive.google.com/uc?export=view&id=1F-rOhVYmRIjkQ5T_Arx8UZRKTrJvIvHr)

### Notes
- Verify that there are no caching issues.
- Check that the image paths are not hardcoded.

---

## B-003 · CORS header error while rendering an element

- **Severity:** Low
- **User(s) affected:** U5 (username: `error_user`/ password: `secret_sauce!`)
- **Environment:** Firefox (150.0.3), Windows (11 Home - 25H2)
- **Author:** Seyla Gomez 

### Steps to Reproduce
1. Go to the login page
2. Enter username/password with U5
3. Click the "Login" button
4. Navigate to /inventory.html and observe the product list
5. Click on the "Sauce Labs Backpack" product

### Expected Result
6. Product details are displayed without errors

### Actual Result
6. Product details are displayed
7. Error messages appear in the console ("Cors header 'Access-Control-Allow-Origin' is missing").

### Evidence
![error-screenshot](https://drive.google.com/uc?export=view&id=1mLbSOg1W2dVkmSKeYvs08DY370AgaVTf)

---

## B-004 · The "checkout" button is not blocked if there are no products to buy

- **Severity:** High
- **User(s) affected:** U3, U1, U4, U5
- **Environment:** Firefox (150.0.3), Windows (11 Home - 25H2)
- **Author:** Seyla Gomez 

### Steps to Reproduce
1. Go to the login page
2. Enter username/password with U3
3. Click the "Login" button
4. Go to the shopping cart icon

### Expected Result
5. The empty list is displayed
6. The "Continue Shopping" button is enabled, and the "Checkout" button is disabled

### Actual Result
5. The empty list is displayed
6. The "Continue Shopping" and "Checkout" buttons are enabled

### Evidence
![error-screenshot](https://drive.google.com/uc?export=view&id=1FytUxF-rt2SCK0xif9JBy2j6oWBDNySN)

### Notes
- This applies to any user exchange: U3, U1, U4, U5

---

## B-005 · Cart data persists across user sessions after logout

- **Severity:** Critical
- **User(s) affected:** U3, U1, U4, U5
- **Environment:** Firefox (150.0.3), Windows (11 Home - 25H2)
- **Author:** Seyla Gomez 

### Steps to Reproduce
1. Go to the login page
2. Enter username/password with U3
3. Click the "Login" button
4. Click "Add to Cart" for one product in the list
5. Click "Add to Cart" for another product
6. Click the menu icon with the "Logout" option
7. On the login page, enter username/password with U1
8. Click the "Login" button
9. Go to your shopping cart icon

### Expected Result
10. The empty list of products selected by U1 is displayed in /cart.html

### Actual Result
10. The list of products selected by U3 is displayed in /cart.html, although only U3 should be able to see it
11. Error messages are displayed on the console

### Evidence
![error-screenshot](https://drive.google.com/uc?export=view&id=1kOffwXZycUORoiJC8XaXjl9fBFRe_xnn)

### Notes
- Before starting, it is verified that the shopping cart of U3 and U1 is empty.
- This applies to any user exchange: U3, U1, U4, U5
- Not only should privacy be improved, but also the security of each user. Access rules need to be defined.
