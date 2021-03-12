- mdx is set to ignore in prettier because remark-containers needs indenting to nest
  elements

- check later for mdx2 and remark-parser 13 to use remark-directives instead of
  remark-container

- Using the minified script tags for tensorflow for now because its way smaller than
  using import \* as tf from "@tensorflow"

==> The minified files from the script tags are 90kb each, while loading tf from npm
increases the size of the bundle to 11MB
