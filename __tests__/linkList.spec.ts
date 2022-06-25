import { LinkedList } from "../lib";

const data = [1, 2, 3, 4, 5]
const anyData: any[][] = [
  [null, null],
  [null, false, 1],
  [NaN, {}, [], Symbol("item")]
]
describe("test linkedList", () => {

  it("list can be init with no data", () => {
    let list = new LinkedList()

    expect(list.size).toEqual(0)
    expect(list.head).toEqual(null)
    expect(list.tail).toEqual(null)

    list = new LinkedList([null])

    expect(list.size).toEqual(1)
    expect(list.head).toBeTruthy()
    expect(list.head!.data).toEqual(null)
    expect(list.tail).toEqual(null)

    list = new LinkedList([null, null])

    expect(list.size).toEqual(2)
    expect(list.head).toBeTruthy()
    expect(list.tail).toBeTruthy()
    expect(list.head!.data).toEqual(null)
    expect(list.tail!.data).toEqual(null)
  })

  it("initial with any data", () => {
    [data, ...anyData].forEach(_d => {
      const list = new LinkedList(_d)

      expect(list.size).toEqual(_d.length)
      expect(list.head).toBeTruthy()
      expect(list.tail).toBeTruthy()
      expect(list.head!.data).toEqual(_d[0])
      expect(list.tail!.data).toEqual(_d[_d.length - 1])
    })
  })
  // api
  //
})
