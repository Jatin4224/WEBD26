# The `useId` Hook

A core idea with React is that components are **reusable**.

We should be able to create a component once and render multiple instances of it without anything breaking.

```jsx
<LoginForm />
<LoginForm />
<LoginForm />
```

This works well most of the time.

But now we hit a problem.

---

## The Core Challenge

Some parts of the web platform were **not designed with reusable components in mind**.

One of the biggest examples is the HTML `id` attribute.

```html
<input id="email" />
```

In HTML, IDs must be **globally unique** across the entire page.

### Why?

Because browser features depend on this uniqueness.

For example:

```html
<label for="email">Email</label> <input id="email" />
```

The browser connects the label and input using that ID.

---

# The Problem With Reusable Components

Imagine we create a reusable component like this:

```jsx
function LoginForm() {
  return (
    <>
      <label htmlFor="email">Email</label>
      <input id="email" />
    </>
  );
}
```

Looks perfectly fine.

But React components are reusable.

So if we render this component multiple times:

```jsx
<LoginForm />
<LoginForm />
```

the DOM becomes:

```html
<input id="email" /> <input id="email" />
```

Now we have duplicate IDs.

This creates problems like:

- Labels connecting to the wrong input
- Accessibility issues
- Unpredictable browser behavior

---

# First Possible Solution

We might think:

> “Let the developer manually provide unique IDs.”

```jsx
function LoginForm({ id }) {
  return <input id={id} />;
}
```

Usage:

```jsx
<LoginForm id="email-1" />
<LoginForm id="email-2" />
```

This works.

But now React depends on the developer to:

- remember to pass the prop,
- ensure uniqueness,
- avoid collisions.

That becomes difficult in large applications.

---

# React’s Solution → `useId`

React introduced the `useId` hook to solve this automatically.

```jsx
function LoginForm() {
  const id = React.useId();

  return (
    <>
      <label htmlFor={id}>Email</label>
      <input id={id} />
    </>
  );
}
```

Now React generates unique IDs automatically:

```txt
:r0:
:r1:
:r2:
```

So rendering:

```jsx
<LoginForm />
<LoginForm />
```

conceptually becomes:

```html
<input id=":r0:" /> <input id=":r1:" />
```

No collisions.
No manual management.

---

# Why Is `useId` a Hook?

This is the most important part.

Why not simply do this?

```jsx
const id = generateRandomId();
```

Because React needs the ID to be:

- Unique
- Stable
- Persistent across renders

---

# The Real Problem

Imagine a new ID was generated every render.

First render:

```txt
:r0:
```

Second render:

```txt
:r8:
```

Third render:

```txt
:r15:
```

Now the DOM keeps changing unnecessarily.

This can cause:

- Labels disconnecting and reconnecting
- Accessibility instability
- Hydration mismatches
- Unnecessary DOM updates

React does **not** want that.

---

# The Key Insight

React hooks are tied to the **component instance**.

That means:

```jsx
const id = React.useId();
```

does **not** mean:

> “Generate a new ID every render.”

It means:

> “Give me the stable unique ID associated with this component instance.”

So when React renders:

```jsx
<LoginForm />
```

React internally stores something like:

```txt
This component instance owns ID :r0:
```

And every future render of that same instance reuses the same ID.

---

# Why `useId` Exists

The real mismatch is:

- React components are reusable
- HTML IDs must be globally unique

`useId` bridges this gap safely and automatically.

---

# Mental Model

Think of `useId` exactly like other hooks:

| Hook       | Stores                                  |
| ---------- | --------------------------------------- |
| `useState` | State per component instance            |
| `useRef`   | Ref per component instance              |
| `useId`    | Stable unique ID per component instance |

The ID belongs to the component instance itself.

That’s why it stays stable across renders while still remaining unique between different component instances.
