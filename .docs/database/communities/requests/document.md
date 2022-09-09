```ts
type Request = {
    bringer: string | null,
    owner: string,
    products: string[],
    state: "OPEN" | "IN_PROGRESS",
    tags: {
        [name: string]: "string"
    }
}
```
