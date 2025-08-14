# pharos-edi-client

A TypeScript client for interacting with Pharos EDI services.

```bash
bun add @iforge-uos/pharos-edi-client
```

## TODO

- Implement transactions (check `FinalizeT` in frmTill.cs)
- See if we can do things in less requests

## `getUser(logonID)`

Gets a user by their login ID, last name and or first name. Must include at least one parameter.

## `getCostCentre(name)`

## `addCostCentre`

Classes:

- User
- CostCentre
- Item
- Transaction

## How it works

Reimplemented the API from a decompiled binary. Made the API easy to use by implementing actual typed objects and not XML.
