TITLE: Installing Tailwind CSS v4.0
DESCRIPTION: Three-step installation process for Tailwind CSS v4.0, showing how to install the package, add the PostCSS plugin, and import Tailwind in your CSS file.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4/index.mdx#2025-04-22_snippet_1

LANGUAGE: shell
CODE:
```
npm i tailwindcss @tailwindcss/postcss;
```

LANGUAGE: javascript
CODE:
```
export default {
  plugins: ["@tailwindcss/postcss"],
};
```

LANGUAGE: css
CODE:
```
@import "tailwindcss";
```

----------------------------------------

TITLE: Defining Custom Color Variables with OKLCH in CSS
DESCRIPTION: This snippet defines custom CSS variables for various color scales (gray, zinc, neutral, stone) using the OKLCH color space. It also includes definitions for black and white colors. These variables can be used to customize color schemes in TailwindCSS or other CSS frameworks.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/colors.mdx#2025-04-22_snippet_14

LANGUAGE: CSS
CODE:
```
  --color-gray-500: oklch(0.551 0.027 264.364);
  --color-gray-600: oklch(0.446 0.03 256.802);
  --color-gray-700: oklch(0.373 0.034 259.733);
  --color-gray-800: oklch(0.278 0.033 256.848);
  --color-gray-900: oklch(0.21 0.034 264.665);
  --color-gray-950: oklch(0.13 0.028 261.692);

  --color-zinc-50: oklch(0.985 0 0);
  --color-zinc-100: oklch(0.967 0.001 286.375);
  --color-zinc-200: oklch(0.92 0.004 286.32);
  --color-zinc-300: oklch(0.871 0.006 286.286);
  --color-zinc-400: oklch(0.705 0.015 286.067);
  --color-zinc-500: oklch(0.552 0.016 285.938);
  --color-zinc-600: oklch(0.442 0.017 285.786);
  --color-zinc-700: oklch(0.37 0.013 285.805);
  --color-zinc-800: oklch(0.274 0.006 286.033);
  --color-zinc-900: oklch(0.21 0.006 285.885);
  --color-zinc-950: oklch(0.141 0.005 285.823);

  --color-neutral-50: oklch(0.985 0 0);
  --color-neutral-100: oklch(0.97 0 0);
  --color-neutral-200: oklch(0.922 0 0);
  --color-neutral-300: oklch(0.87 0 0);
  --color-neutral-400: oklch(0.708 0 0);
  --color-neutral-500: oklch(0.556 0 0);
  --color-neutral-600: oklch(0.439 0 0);
  --color-neutral-700: oklch(0.371 0 0);
  --color-neutral-800: oklch(0.269 0 0);
  --color-neutral-900: oklch(0.205 0 0);
  --color-neutral-950: oklch(0.145 0 0);

  --color-stone-50: oklch(0.985 0.001 106.423);
  --color-stone-100: oklch(0.97 0.001 106.424);
  --color-stone-200: oklch(0.923 0.003 48.717);
  --color-stone-300: oklch(0.869 0.005 56.366);
  --color-stone-400: oklch(0.709 0.01 56.259);
  --color-stone-500: oklch(0.553 0.013 58.071);
  --color-stone-600: oklch(0.444 0.011 73.639);
  --color-stone-700: oklch(0.374 0.01 67.558);
  --color-stone-800: oklch(0.268 0.007 34.298);
  --color-stone-900: oklch(0.216 0.006 56.043);
  --color-stone-950: oklch(0.147 0.004 49.25);

  --color-black: #000;
  --color-white: #fff;
```

----------------------------------------

TITLE: Parent-based State Styling with group Class in Tailwind CSS
DESCRIPTION: Demonstrates how to style child elements based on parent state using the group class and group-hover variant. Shows a complex example with SVG and text elements that respond to parent hover state.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/hover-focus-and-other-states.mdx#2025-04-22_snippet_15

LANGUAGE: html
CODE:
```
<a href="#" class="group ...">
  <div>
    <svg class="stroke-sky-500 group-hover:stroke-white ..." fill="none" viewBox="0 0 24 24">
      <!-- ... -->
    </svg>
    <h3 class="text-gray-900 group-hover:text-white ...">New project</h3>
  </div>
  <p class="text-gray-500 group-hover:text-white ...">Create a new project from a variety of starting templates.</p>
</a>
```

----------------------------------------

TITLE: Scanning for Classes in JSX - JSX - Tailwind CSS
DESCRIPTION: Provides an example of a React (JSX) component using various Tailwind CSS classes. This snippet illustrates how Tailwind scans source files like `.jsx` to identify used class names (`px-4`, `py-2`, etc.) for CSS generation.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_20

LANGUAGE: JSX
CODE:
```
export default function Button({ size, children }) {
  let sizeClasses = {
    md: "px-4 py-2 rounded-md text-base",
    lg: "px-5 py-3 rounded-lg text-lg",
  }[size];

  return (
    <button type="button" className={`font-bold ${sizeClasses}`}>
      {children}
    </button>
  );
}
```

----------------------------------------

TITLE: Styling UI Component with Tailwind CSS in HTML
DESCRIPTION: This snippet provides a standard HTML example of applying Tailwind CSS utility classes to create a card component. It mirrors the JSX example but uses standard `class` attributes, showcasing the direct application of utilities for layout, appearance, spacing, and text styling, including dark mode variants.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_1

LANGUAGE: HTML
CODE:
```
<!-- prettier-ignore -->
<div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
  <img class="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" />
  <div>
    <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
    <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
  </div>
</div>
```

----------------------------------------

TITLE: Updating Tailwind CSS Imports
DESCRIPTION: New way to import Tailwind CSS in v4 using standard CSS import syntax instead of @tailwind directives.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/upgrade-guide.mdx#2025-04-22_snippet_4

LANGUAGE: css
CODE:
```
@import "tailwindcss";
```

----------------------------------------

TITLE: Applying Dark Mode Classes in HTML with Tailwind CSS
DESCRIPTION: This snippet demonstrates how to use Tailwind CSS classes to style elements differently in dark mode. It includes classes for background color and text color changes.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/dark-mode.mdx#2025-04-22_snippet_0

LANGUAGE: HTML
CODE:
```
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <div>
    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
      <svg class="h-6 w-6 stroke-white" ...>
        <!-- ... -->
      </svg>
    </span>
  </div>
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

----------------------------------------

TITLE: Styling Keyboard Focus with Tailwind CSS
DESCRIPTION: Demonstrates the use of the 'focus-visible' variant to style an element when it has been focused using the keyboard.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/hover-focus-and-other-states.mdx#2025-04-22_snippet_86

LANGUAGE: HTML
CODE:
```
<button class="focus-visible:outline-2 ...">Submit</button>
```

----------------------------------------

TITLE: Mobile-First Correct Example
DESCRIPTION: Example showing correct mobile-first approach using unprefixed utility for mobile and override for larger screens.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/responsive-design.mdx#2025-04-22_snippet_4

LANGUAGE: html
CODE:
```
<div class="text-center sm:text-left"></div>
```

----------------------------------------

TITLE: Container Query Examples
DESCRIPTION: Demonstrates the new built-in container query support including min, max and range queries.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4/index.mdx#2025-04-22_snippet_11

LANGUAGE: html
CODE:
```
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-3 @lg:grid-cols-4">
    <!-- ... -->
  </div>
</div>
```

LANGUAGE: html
CODE:
```
<div class="@container">
  <div class="grid grid-cols-3 @max-md:grid-cols-1">
    <!-- ... -->
  </div>
</div>
```

LANGUAGE: html
CODE:
```
<div class="@container">
  <div class="flex @min-md:@max-xl:hidden">
    <!-- ... -->
  </div>
</div>
```

----------------------------------------

TITLE: Matching Dynamic Viewport Height - Tailwind CSS HTML
DESCRIPTION: Explains how the `h-dvh` utility sets an element's height to 100% of the dynamic viewport height (`100dvh`), which adjusts based on the visibility of browser UI elements like address bars.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/height.mdx#_snippet_4

LANGUAGE: html
CODE:
```
<!-- [!code classes:h-dvh] -->
<div class="h-dvh">
  <!-- ... -->
</div>
```

----------------------------------------

TITLE: Adding Viewport Meta Tag in HTML
DESCRIPTION: Required viewport meta tag that should be added to the document head for proper responsive behavior.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/responsive-design.mdx#2025-04-22_snippet_0

LANGUAGE: html
CODE:
```
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

----------------------------------------

TITLE: Styling Email Input and Validation Message with Peer Classes in HTML
DESCRIPTION: This snippet demonstrates how to use the 'peer' class and 'peer-invalid' variant to show a validation message for an email input field.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/hover-focus-and-other-states.mdx#2025-04-22_snippet_20

LANGUAGE: HTML
CODE:
```
<form>
  <label class="block">
    <span class="...">Email</span>
    <input type="email" class="peer ..." />
    <p class="invisible peer-invalid:visible ...">Please provide a valid email address.</p>
  </label>
</form>
```

----------------------------------------

TITLE: Using Arbitrary Peer Variants in HTML and CSS
DESCRIPTION: This snippet demonstrates how to create and use arbitrary peer variants for custom styling based on sibling states.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/hover-focus-and-other-states.mdx#2025-04-22_snippet_22

LANGUAGE: HTML
CODE:
```
<form>
  <label for="email">Email:</label>
  <input id="email" name="email" type="email" class="is-dirty peer" required />
  <div class="peer-[.is-dirty]:peer-required:block hidden">This field is required.</div>
  <!-- ... -->
</form>
```

LANGUAGE: CSS
CODE:
```
.peer-\[\.is-dirty\]\:peer-required\:block {
  &:is(:where(.peer):is(.is-dirty) ~ *) {
    &:is(:where(.peer):required ~ *) {
      display: block;
    }
  }
}
```

----------------------------------------

TITLE: Responsive Card Layout Component
DESCRIPTION: Complete example of a responsive card component that changes from stacked to side-by-side layout at medium breakpoints using flex utilities.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/responsive-design.mdx#2025-04-22_snippet_2

LANGUAGE: html
CODE:
```
<div class="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img
        class="h-48 w-full object-cover md:h-full md:w-48"
        src="/img/building.jpg"
        alt="Modern building architecture"
      />
    </div>
    <div class="p-8">
      <div class="text-sm font-semibold tracking-wide text-indigo-500 uppercase">Company retreats</div>
      <a href="#" class="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
        Incredible accommodation for your team
      </a>
      <p class="mt-2 text-gray-500">
        Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of
        places to do just that.
      </p>
    </div>
  </div>
</div>
```

----------------------------------------

TITLE: Using Modern CSS Features in Tailwind CSS v4.0
DESCRIPTION: Example demonstrating how Tailwind CSS v4.0 leverages modern CSS features like cascade layers, color-mix(), and custom property registration with @property. Shows the syntax for defining utility classes and gradient properties.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4/index.mdx#2025-04-22_snippet_0

LANGUAGE: css
CODE:
```
@layer theme, base, components, utilities;

@layer utilities {
  .mx-6 {
    margin-inline: calc(var(--spacing) * 6);
  }
  .bg-blue-500\/50 {
    background-color: color-mix(in oklab, var(--color-blue-500) 50%, transparent);
  }
}

@property --tw-gradient-from {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
```

----------------------------------------

TITLE: Interactive Button Example with React/JSX
DESCRIPTION: Complex example showing buttons with different transition durations implemented using React components and Tailwind CSS classes.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/transition-duration.mdx#2025-04-22_snippet_2

LANGUAGE: jsx
CODE:
```
<div className="flex flex-col justify-around gap-8 text-sm leading-6 font-bold text-white sm:flex-row sm:gap-0">
  <div className="flex shrink-0 flex-col items-center">
    <p className="mb-3 text-center font-mono text-xs font-medium text-gray-500 dark:text-gray-400">duration-150</p>
    <button className="rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-white duration-150 ease-in-out hover:scale-125">
      Button A
    </button>
  </div>
  <div className="flex shrink-0 flex-col items-center">
    <p className="mb-3 text-center font-mono text-xs font-medium text-gray-500 dark:text-gray-400">duration-300</p>
    <button className="rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-white duration-300 ease-in-out hover:scale-125">
      Button B
    </button>
  </div>
  <div className="flex shrink-0 flex-col items-center">
    <p className="mb-3 text-center font-mono text-xs font-medium text-gray-500 dark:text-gray-400">duration-700</p>
    <button className="rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-white duration-700 ease-in-out hover:scale-125">
      Button C
    </button>
  </div>
</div>
```

----------------------------------------

TITLE: Form Input State Styling using Tailwind CSS Variants
DESCRIPTION: Example showing how to use Tailwind CSS state variants like invalid:, disabled:, and focus: to style form inputs. The code demonstrates styling for disabled states, validation states, and focus states with color and border modifications.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/hover-focus-and-other-states.mdx#2025-04-22_snippet_8

LANGUAGE: jsx
CODE:
```
<div className="mx-auto max-w-md border-x border-x-gray-200 px-6 py-5 dark:border-x-gray-800 dark:bg-gray-950/10">
  <form>
    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Username
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="username"
          id="username"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none sm:text-sm dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
          defaultValue="tbone"
          disabled
        />
      </div>
    </div>
    <!-- Additional form elements -->
  </form>
</div>
```

LANGUAGE: html
CODE:
```
<input
  type="text"
  value="tbone"
  disabled
  class="invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 ..."
/>
```

----------------------------------------

TITLE: Using the important modifier in HTML/CSS
DESCRIPTION: Demonstrates how to use the `!` suffix on a Tailwind class in HTML to make it `!important` in the generated CSS, overriding conflicting styles.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_34

LANGUAGE: HTML
CODE:
```
<!-- [!code filename:HTML] -->
<!-- [!code classes:bg-red-500!] -->
<!-- prettier-ignore -->
<div class="bg-teal-500 bg-red-500!">
  <!-- ... -->
</div>
```

LANGUAGE: CSS
CODE:
```
/* [!code filename: Generated CSS] */
/* [!code word:!important] */
.bg-red-500\! {
  background-color: var(--color-red-500) !important;
}
.bg-teal-500 {
  background-color: var(--color-teal-500);
}
```

----------------------------------------

TITLE: Form Input State Styling in TailwindCSS
DESCRIPTION: Collection of input state styling examples including disabled, enabled, checked, and validation states using TailwindCSS variants.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/hover-focus-and-other-states.mdx#2025-04-22_snippet_103

LANGUAGE: html
CODE:
```
<input class="disabled:opacity-75 ..." />
```

LANGUAGE: html
CODE:
```
<input class="enabled:hover:border-gray-400 disabled:opacity-75 ..." />
```

LANGUAGE: html
CODE:
```
<input type="checkbox" class="appearance-none checked:bg-blue-500 ..." />
```

LANGUAGE: html
CODE:
```
<input type="checkbox" class="appearance-none indeterminate:bg-gray-300 ..." />
```

LANGUAGE: html
CODE:
```
<input type="checkbox" class="default:outline-2 ..." />
```

LANGUAGE: html
CODE:
```
<input class="border optional:border-red-500 ..." />
```

LANGUAGE: html
CODE:
```
<input required class="border required:border-red-500 ..." />
```

LANGUAGE: html
CODE:
```
<input required class="border valid:border-green-500 ..." />
```

LANGUAGE: html
CODE:
```
<input required class="border invalid:border-red-500 ..." />
```

LANGUAGE: html
CODE:
```
<input required class="border user-valid:border-green-500" />
```

LANGUAGE: html
CODE:
```
<input required class="border user-invalid:border-red-500" />
```

LANGUAGE: html
CODE:
```
<input min="1" max="5" class="in-range:border-green-500 ..." />
```

LANGUAGE: html
CODE:
```
<input min="1" max="5" class="out-of-range:border-red-500 ..." />
```

LANGUAGE: html
CODE:
```
<input class="placeholder-shown:border-gray-500 ..." placeholder="you@example.com" />
```

LANGUAGE: html
CODE:
```
<details class="details-content:bg-gray-100 ...">
  <summary>Details</summary>
  This is a secret.
</details>
```

LANGUAGE: html
CODE:
```
<input class="autofill:bg-yellow-200 ..." />
```

LANGUAGE: html
CODE:
```
<input class="read-only:bg-gray-100 ..." />
```

----------------------------------------

TITLE: Specifying Grid Columns with Tailwind CSS
DESCRIPTION: Demonstrates how to use grid-cols-<number> utilities to create grids with equally sized columns in Tailwind CSS.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/grid-template-columns.mdx#2025-04-22_snippet_1

LANGUAGE: html
CODE:
```
<div class="grid grid-cols-4 gap-4">
  <div>01</div>
  <!-- ... -->
  <div>09</div>
</div>
```

----------------------------------------

TITLE: Implementing Custom CSS with @layer in Tailwind
DESCRIPTION: Demonstrates how to add custom CSS using Tailwind's layer system for base styles and component classes.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/adding-custom-styles.mdx#2025-04-22_snippet_2

LANGUAGE: css
CODE:
```
@layer base {
  h1 {
    font-size: var(--text-2xl);
  }

  h2 {
    font-size: var(--text-xl);
  }
}

@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--rounded-lg);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-xl);
  }
}
```

----------------------------------------

TITLE: Creating Simple Custom Utilities in TailwindCSS
DESCRIPTION: Shows how to create basic custom utilities using the @utility directive. Includes both HTML usage examples and CSS implementation.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/adding-custom-styles.mdx#2025-04-22_snippet_4

LANGUAGE: css
CODE:
```
@utility content-auto {
  content-visibility: auto;
}
```

LANGUAGE: html
CODE:
```
<div class="content-auto">
  <!-- ... -->
</div>
```

LANGUAGE: html
CODE:
```
<div class="hover:content-auto">
  <!-- ... -->
</div>
```

----------------------------------------

TITLE: Inlining utility classes with @apply directive
DESCRIPTION: Demonstrates how to use the @apply directive to inline existing utility classes into custom CSS.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/functions-and-directives.mdx#2025-04-22_snippet_6

LANGUAGE: CSS
CODE:
```
.select2-dropdown {
  @apply rounded-b-lg shadow-md;
}

.select2-search {
  @apply rounded border border-gray-300;
}

.select2-results__group {
  @apply text-lg font-bold text-gray-900;
}
```

----------------------------------------

TITLE: Implementing Payment Method Selection with :has() Variant in Tailwind CSS
DESCRIPTION: HTML markup showing how to use the has-checked variant to style radio button labels based on their checked state. The code demonstrates styling payment method options with different visual states for selected and unselected options, including dark mode support.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/hover-focus-and-other-states.mdx#2025-04-22_snippet_9

LANGUAGE: html
CODE:
```
<label
  class="has-checked:bg-indigo-50 has-checked:text-indigo-900 has-checked:ring-indigo-200 dark:has-checked:bg-indigo-950 dark:has-checked:text-indigo-200 dark:has-checked:ring-indigo-900 ..."
>
  <svg fill="currentColor">
    <!-- ... -->
  </svg>
  Google Pay

```

----------------------------------------

TITLE: Styling Native Form Controls with Tailwind CSS
DESCRIPTION: Demonstrates how to style file inputs and checkboxes using Tailwind CSS's new file: modifier and accent-color property. Includes custom styling for file upload buttons and checkbox accent colors.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v3/index.mdx#2025-04-22_snippet_6

LANGUAGE: html
CODE:
```
<form>
  <div class="flex items-center space-x-6">
    <div class="shrink-0">
      <img
        class="h-16 w-16 rounded-full object-cover"
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
        alt="Current profile photo"
      />
    </div>
    <label class="block">
      <span class="sr-only">Choose profile photo</span>
      <input
        type="file"
        class="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
      />
    </label>
  </div>
  <label class="mt-6 flex items-center justify-center space-x-2 text-sm font-medium text-slate-600">
    <input type="checkbox" class="accent-violet-500" checked />
    <span>Yes, send me all your stupid updates</span>
  </label>
</form>
```

----------------------------------------

TITLE: Defining Tailwind CSS Gap Utility in Grid Layout
DESCRIPTION: Demonstrates the use of gap-4 utility class in a grid layout with two columns and four items. This example shows how to apply gap between both rows and columns.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/gap.mdx#2025-04-22_snippet_1

LANGUAGE: HTML
CODE:
```
<div class="grid grid-cols-2 gap-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

----------------------------------------

TITLE: Targeting Dark Mode with Tailwind CSS Classes
DESCRIPTION: This snippet illustrates how to use the 'dark' variant in Tailwind CSS to apply different styles for dark mode. It includes classes for background, text, and other elements that change in dark mode.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/colors.mdx#2025-04-22_snippet_4

LANGUAGE: html
CODE:
```
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <div>
    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
      <svg class="h-6 w-6 stroke-white" ...>
        <!-- ... -->
      </svg>
    </span>
  </div>
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

----------------------------------------

TITLE: CSS Modules with @apply Example
DESCRIPTION: Demonstrates how to use @apply in CSS modules by importing global styles as reference.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/compatibility.mdx#2025-04-22_snippet_5

LANGUAGE: css
CODE:
```
@reference "../app.css";

button {
  @apply bg-blue-500;
}
```

----------------------------------------

TITLE: Updating PostCSS Configuration
DESCRIPTION: Changes required in PostCSS configuration when upgrading to v4, including removing postcss-import and autoprefixer, and using the new @tailwindcss/postcss package.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/upgrade-guide.mdx#2025-04-22_snippet_1

LANGUAGE: javascript
CODE:
```
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

----------------------------------------

TITLE: Styling Radio Buttons and Labels with Named Peer Classes in HTML
DESCRIPTION: This example shows how to use named peer classes to style radio buttons and their associated labels based on their checked state.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/hover-focus-and-other-states.mdx#2025-04-22_snippet_21

LANGUAGE: HTML
CODE:
```
<fieldset>
  <legend>Published status</legend>

  <input id="draft" class="peer/draft" type="radio" name="status" checked />
  <label for="draft" class="peer-checked/draft:text-sky-500">Draft</label>

  <input id="published" class="peer/published" type="radio" name="status" />
  <label for="published" class="peer-checked/published:text-sky-500">Published</label>
  <div class="hidden peer-checked/draft:block">Drafts are only visible to administrators.</div>
  <div class="hidden peer-checked/published:block">Your post will be publicly visible on your site.</div>
</fieldset>
```

----------------------------------------

TITLE: Implementing Dark Mode Toggle with System Theme Support in JavaScript
DESCRIPTION: This JavaScript snippet shows how to implement a dark mode toggle that supports light mode, dark mode, and system theme preference using localStorage and the matchMedia API.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/dark-mode.mdx#2025-04-22_snippet_5

LANGUAGE: JavaScript
CODE:
```
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
);

// Whenever the user explicitly chooses light mode
localStorage.theme = "light";

// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");
```

----------------------------------------

TITLE: Updating Outline-none to Outline-hidden in HTML
DESCRIPTION: Demonstrates the rename of outline-none to outline-hidden for maintaining accessibility in forced colors mode.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/upgrade-guide.mdx#2025-04-22_snippet_7

LANGUAGE: html
CODE:
```
<input class="focus:outline-none" />
<input class="focus:outline-hidden" />
```

----------------------------------------

TITLE: Creating custom variants with @custom-variant directive
DESCRIPTION: Illustrates how to use the @custom-variant directive to add a custom variant in your Tailwind project.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/functions-and-directives.mdx#2025-04-22_snippet_5

LANGUAGE: CSS
CODE:
```
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

----------------------------------------

TITLE: Using prefers-contrast Variant in Tailwind CSS
DESCRIPTION: Example showing how to use the contrast-more variant to enhance form input contrast based on user preferences. Demonstrates applying different border colors, placeholder text colors, and opacity levels.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/hover-focus-and-other-states.mdx#2025-04-22_snippet_39

LANGUAGE: html
CODE:
```
<label class="block">
  <span class="block text-sm font-medium text-gray-700">Social Security Number</span>
  <input
    class="border-gray-200 placeholder-gray-400 contrast-more:border-gray-400 contrast-more:placeholder-gray-500 ..."
  />
  <p class="text-gray-600 opacity-10 contrast-more:opacity-100 ...">We need this to steal your identity.</p>
</label>
```

----------------------------------------

TITLE: Building Component with Tailwind Utilities (React)
DESCRIPTION: Demonstrates building a responsive component using Tailwind CSS utility classes within a React/JSX context. It showcases responsive variants (@sm:), spacing (space-y, gap-x), layout (flex, items-center), and state variants (hover:, active:) for styling.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_2

LANGUAGE: javascript
CODE:
```
<div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg ring ring-black/5 @sm:flex @sm:items-center @sm:space-y-0 @sm:gap-x-6 @sm:py-4">
  <img
    className="mx-auto block h-24 rounded-full @sm:mx-0 @sm:shrink-0"
    src={erinLindford.src}
    alt="Woman's Face"
  />
  <div className="space-y-2 text-center @sm:text-left">
    <div className="space-y-0.5">
      <p className="text-lg font-semibold text-black">Erin Lindford</p>
      <p className="font-medium text-gray-500">Product Engineer</p>
    </div>
    <button className="rounded-full border border-purple-200 px-4 py-1 text-sm font-semibold text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">
      Message
    </button>
  </div>
</div>
```

----------------------------------------

TITLE: Creating a Reusable React Component with Tailwind CSS
DESCRIPTION: Demonstrates how to build a reusable React component (`VacationCard`) using Tailwind CSS utility classes for styling. Shows how props can be used to make the component dynamic, allowing for easy reuse with different content.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_30

LANGUAGE: jsx
CODE:
```
export function VacationCard({ img, imgAlt, eyebrow, title, pricing, url }) {
  return (
    <div>
      <img className="rounded-lg" src={img} alt={imgAlt} />
      <div className="mt-4">
        <div className="text-xs font-bold text-sky-500">{eyebrow}</div>
        <div className="mt-1 font-bold text-gray-700">
          <a href={url} className="hover:underline">
            {title}
          </a>
        </div>
        <div className="mt-2 text-sm text-gray-600">{pricing}</div>
      </div>
    </div>
  );
}
```

----------------------------------------

TITLE: Correct Static Class Mapping in React
DESCRIPTION: Properly formatted React component that maps props to complete class names, allowing Tailwind to detect and generate all necessary utilities.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/detecting-classes-in-source-files.mdx#2025-04-22_snippet_4

LANGUAGE: jsx
CODE:
```
function Button({ color, children }) {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500",
    red: "bg-red-600 hover:bg-red-500",
  };

  return <button className={`${colorVariants[color]} ...`}>{children}</button>;
}
```

----------------------------------------

TITLE: Cropping Background to Text - JSX
DESCRIPTION: Demonstrates using `bg-clip-text` in JSX with a gradient background (`bg-gradient-to-r`). The text color is set to transparent (`text-transparent`) to allow the background to show through the text shape. This creates a text fill effect using the background.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/background-clip.mdx#_snippet_3

LANGUAGE: JSX
CODE:
```
    {
    <p className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-center text-4xl leading-none font-extrabold tracking-tight text-transparent sm:text-5xl">
      Hello world
    </p>
  }
```

----------------------------------------

TITLE: Customizing Breakpoints with Theme Variables in CSS
DESCRIPTION: Demonstrates how to customize Tailwind breakpoints using theme variables. Shows setting custom breakpoint sizes and creating new breakpoints using rem units.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/responsive-design.mdx#2025-04-22_snippet_7

LANGUAGE: css
CODE:
```
@import "tailwindcss";

@theme {
  --breakpoint-xs: 30rem;
  --breakpoint-2xl: 100rem;
  --breakpoint-3xl: 120rem;
}
```

----------------------------------------

TITLE: Matching Small Viewport Height - Tailwind CSS HTML
DESCRIPTION: Shows the `h-svh` utility, which sets an element's height to 100% of the small viewport height (`100svh`), representing the smallest possible size the viewport can take.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/height.mdx#_snippet_6

LANGUAGE: html
CODE:
```
<!-- [!code classes:h-svh] -->
<div class="h-svh">
  <!-- ... -->
</div>
```

----------------------------------------

TITLE: Using * Variant for Child Element Styling in HTML
DESCRIPTION: Demonstrates how to use the new * variant to style direct children elements with utility classes. This feature allows targeting all direct children from the parent element.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v3-4/index.mdx#2025-04-22_snippet_6

LANGUAGE: html
CODE:
```
<div>
  <h2>Categories:<h2>
  <ul class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">
    <li>Sales</li>
    <li>Marketing</li>
    <li>SEO</li>
    <!-- ... -->
  </ul>
</div>
```

----------------------------------------

TITLE: Importing Tailwind Components
DESCRIPTION: Import statements for required Tailwind CSS documentation components including API table, examples, figures, and responsive design components.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/transition-behavior.mdx#2025-04-22_snippet_0

LANGUAGE: javascript
CODE:
```
import { ApiTable } from "@/components/api-table.tsx";
import { Example } from "@/components/example.tsx";
import { Figure } from "@/components/figure.tsx";
import { ResponsiveDesign } from "@/components/content.tsx";
```

----------------------------------------

TITLE: Using the New Line-Height Shorthand in Tailwind CSS
DESCRIPTION: This HTML snippet demonstrates the new line-height shorthand syntax in Tailwind CSS, allowing you to set both font-size and line-height with a single utility class. It shows the transition from the old `text-lg leading-7` syntax to the new `text-lg/7` syntax.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v3-3/index.mdx#_snippet_30

LANGUAGE: HTML
CODE:
```
<p class="text-lg leading-7 ..."><!-- [!code --] --><p class="text-lg/7 ..."><!-- [!code ++] -->
  So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way
  past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living
  things but I tell you Jerry at that moment, I <em>was</em> a marine biologist.
</p>
```

----------------------------------------

TITLE: Named Container Queries Usage
DESCRIPTION: Shows how to implement named containers for complex nested container query scenarios.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/responsive-design.mdx#2025-04-22_snippet_15

LANGUAGE: html
CODE:
```
<div class="@container/main">
  <!-- ... -->
  <div class="flex flex-row @sm/main:flex-col">
    <!-- ... -->
  </div>
</div>
```

----------------------------------------

TITLE: Using pointer-coarse variant for responsive touchscreen interfaces in HTML with Tailwind CSS
DESCRIPTION: This example demonstrates how to use Tailwind's pointer-coarse variant to make UI elements more touch-friendly on touchscreen devices. It applies larger padding, spacing, and fewer columns for better touchscreen interaction.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4-1/index.mdx#2025-04-22_snippet_13

LANGUAGE: html
CODE:
```
<!-- [!code classes:pointer-coarse:mt-6,pointer-coarse:grid-cols-3,pointer-coarse:gap-4,pointer-coarse:p-4] -->
<fieldset aria-label="Choose a memory option">
  <div class="flex items-center justify-between">
    <div>RAM</div>
    <a href="#"> See performance specs </a>
  </div>
  <div class="mt-4 grid grid-cols-6 gap-2 pointer-coarse:mt-6 pointer-coarse:grid-cols-3 pointer-coarse:gap-4">
    <label class="p-2 pointer-coarse:p-4 ...">
      <input type="radio" name="memory-option" value="4 GB" className="sr-only" />
      <span>4 GB</span>
    </label>
    <!-- ... -->
  </div>
</fieldset>
```

----------------------------------------

TITLE: Creating Screen-Reader Only Content with Tailwind CSS
DESCRIPTION: These snippets demonstrate how to use the 'sr-only' class to hide content visually while keeping it accessible to screen readers, and how to use 'not-sr-only' to reverse this effect responsively.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/display.mdx#2025-04-22_snippet_10

LANGUAGE: html
CODE:
```
<a href="#">
  <svg><!-- ... --></svg>
  <span class="sr-only">Settings</span>
</a>
```

LANGUAGE: html
CODE:
```
<a href="#">
  <svg><!-- ... --></svg>
  <span class="sr-only sm:not-sr-only">Settings</span>
</a>
```

----------------------------------------

TITLE: Implementing Custom Variants in TailwindCSS
DESCRIPTION: Shows how to create custom variants using the @custom-variant directive with both simple and complex implementations.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/adding-custom-styles.mdx#2025-04-22_snippet_7

LANGUAGE: css
CODE:
```
@custom-variant theme-midnight {
  &:where([data-theme="midnight"] *) {
    @slot;
  }
}
```

LANGUAGE: html
CODE:
```
<html data-theme="midnight">
  <button class="theme-midnight:bg-black ..."></button>
</html>
```

----------------------------------------

TITLE: Basic Transition Timing Function Example
DESCRIPTION: Demonstrates the usage of transition timing function utilities in Tailwind CSS with three different buttons showing ease-in, ease-out, and ease-in-out effects.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/transition-timing-function.mdx#2025-04-22_snippet_1

LANGUAGE: html
CODE:
```
<button class="duration-300 ease-in ...">Button A</button>
<button class="duration-300 ease-out ...">Button B</button>
<button class="duration-300 ease-in-out ...">Button C</button>
```