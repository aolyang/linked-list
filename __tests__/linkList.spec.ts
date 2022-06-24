import { LinkedList } from "../lib";

describe("test singly linkedList", () => {
  const data = [1, 2, 3, 4, 5]

  it("initial from array", () => {
    const list = new LinkedList(data)

    expect(list.size).toEqual(data.length)
    expect(list.head!.data).toEqual(data[0])
    expect(list.tail!.data).toEqual(data[data.length - 1])
  })
  // api
  //
})
