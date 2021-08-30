[index.md - v1.1.1](../README.md) / [Exports](../modules.md) / default

# Class: default

postmessage 集成方案

**`example`**

```js
let messager = new PostMessager()
messager.subscribe('action', content => {
    console.log(21, content)
})
messager.postMessageUp('action', { up: 201 })
```

## Table of contents

### Constructors

-   [constructor](default.md#constructor)

### Properties

-   [instance](default.md#instance)
-   [messager](default.md#messager)
-   [type](default.md#type)

### Methods

-   [createEventHandler](default.md#createeventhandler)
-   [postMessageDown](default.md#postmessagedown)
-   [postMessageUp](default.md#postmessageup)
-   [removeEventHandler](default.md#removeeventhandler)
-   [subscribe](default.md#subscribe)
-   [unsubscribe](default.md#unsubscribe)

## Constructors

### constructor

• **new default**(`instance?`, `type?`)

#### Parameters

| Name       | Type     | Default value         |
| :--------- | :------- | :-------------------- |
| `instance` | `object` | `{}`                  |
| `type`     | `string` | `'invokeCustomEvent'` |

#### Defined in

[index.ts:37](https://github.com/saqqdy/postmessager/blob/d5c38b0/src/index.ts#L37)

## Properties

### instance

• **instance**: `Object`

#### Index signature

▪ [type: `string`]: `any`

#### Defined in

[index.ts:33](https://github.com/saqqdy/postmessager/blob/d5c38b0/src/index.ts#L33)

---

### messager

• **messager**: `Object` = `{}`

#### Index signature

▪ [type: `string`]: `any`

#### Defined in

[index.ts:29](https://github.com/saqqdy/postmessager/blob/d5c38b0/src/index.ts#L29)

---

### type

• **type**: `string`

#### Defined in

[index.ts:36](https://github.com/saqqdy/postmessager/blob/d5c38b0/src/index.ts#L36)

## Methods

### createEventHandler

▸ **createEventHandler**(`__namedParameters`): `boolean` \| `void`

#### Parameters

| Name                | Type  |
| :------------------ | :---- |
| `__namedParameters` | `any` |

#### Returns

`boolean` \| `void`

#### Defined in

[index.ts:57](https://github.com/saqqdy/postmessager/blob/d5c38b0/src/index.ts#L57)

---

### postMessageDown

▸ **postMessageDown**(`name`, `actionName`, `content`, `pageId`): `void`

#### Parameters

| Name         | Type               |
| :----------- | :----------------- |
| `name`       | `null` \| `string` |
| `actionName` | `string`           |
| `content`    | `any`              |
| `pageId`     | `string`           |

#### Returns

`void`

#### Defined in

[index.ts:94](https://github.com/saqqdy/postmessager/blob/d5c38b0/src/index.ts#L94)

---

### postMessageUp

▸ **postMessageUp**(`actionName`, `content?`, `pageId`): `void`

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `actionName` | `string` |
| `content`    | `any`    |
| `pageId`     | `string` |

#### Returns

`void`

#### Defined in

[index.ts:77](https://github.com/saqqdy/postmessager/blob/d5c38b0/src/index.ts#L77)

---

### removeEventHandler

▸ **removeEventHandler**(): `void`

#### Returns

`void`

#### Defined in

[index.ts:73](https://github.com/saqqdy/postmessager/blob/d5c38b0/src/index.ts#L73)

---

### subscribe

▸ **subscribe**(`actionName`, `handler`): `void`

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `actionName` | `string` |
| `handler`    | `any`    |

#### Returns

`void`

#### Defined in

[index.ts:48](https://github.com/saqqdy/postmessager/blob/d5c38b0/src/index.ts#L48)

---

### unsubscribe

▸ **unsubscribe**(`action`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `action` | `string` |

#### Returns

`void`

#### Defined in

[index.ts:53](https://github.com/saqqdy/postmessager/blob/d5c38b0/src/index.ts#L53)
