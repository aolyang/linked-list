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
      expect(list.head!.next!.data).toEqual(_d[1])
      expect(list.tail!.data).toEqual(_d[_d.length - 1])
      expect(list.tail!.prev!.data).toEqual(_d[_d.length - 2])
    })
  })

  // api
  it("forEach order correctly", () => {
    const list = new LinkedList(data)
    list.forEach((node,index) => {
      expect(node.data).toEqual(data[index])
    })
  })


  it("node insert correctly", () => {
    let list = new LinkedList()
    list.insert(1)

    // [ 1 ]
    expect(list.size).toEqual(1)
    expect(list.head).toEqual(list.tail)
    expect(list.head!.next).toEqual(list.tail!.prev)
    expect(list.head!.next).toEqual(null)
    expect(list.head!.data).toEqual(list.tail!.data)
    expect(list.head!.data).toEqual(1)

    // [ 1, 2 ]
    list.insert(2)
    expect(list.size).toEqual(2)
    expect(list.head!.data).toEqual(1)
    expect(list.head!.next!.data).toEqual(2)
    expect(list.tail!.data).toEqual(2)
    expect(list.tail!.prev!.data).toEqual(1)

    // [ 1, 2, 3 ]
    list.insert(3)
    expect(list.size).toEqual(3)
    expect(list.tail!.data).toEqual(3)
    expect(list.tail!.prev).toEqual(list.head!.next)
    expect(list.head!.next!.data).toEqual(list.tail!.prev!.data)

    // [ 0, 1, 2, 3 ]
    list.insert(0, 0)
    expect(list.size).toEqual(4)
    expect(list.head!.data).toEqual(0)
    expect(list.head!.next!.data).toEqual(1)
    expect(list.tail!.data).toEqual(3)
    expect(list.tail!.prev!.data).toEqual(2)

    /*
    *                   head  1️⃣, 2, 3, 4
    * [ 0, 1, 2, 3 ]  => [ 0, -1, 1, 2, 3 ]
    * */
    list.insert(-1, 1)
    expect(list.size).toEqual(5)
    expect(list.head!.data).toEqual(0)
    expect(list.head!.next!.data).toEqual(-1)

    /*
    *  0,  1, 2, 3, 4      head  1  2  3  4️⃣  5
    *[ 0, -1, 1, 2, 3 ] => [ 0, -1, 1, 2, -3, 3 ]
    * */
    list.insert(-3, list.size - 1)
    expect(list.size).toEqual(6)
    expect(list.head!.data).toEqual(0)
    expect(list.tail!.data).toEqual(3)
    expect(list.head!.next!.data).toEqual(-1)
    expect(list.tail!.prev!.data).toEqual(-3)


    /*
    *
    * head  1  2  3   4  5        head  1  2️⃣   3  4   5, 6
    * [ 0, -1, 1, 2, -3, 3 ]  =>  [ 0, -1, -4, 1, 2, -3, 3 ]
    * */
    list.insert(-4, 2)
    expect(list.size).toEqual(7)
    expect(list.tail!.data).toEqual(3)
    expect(list.tail!.prev!.data).toEqual(-3)
    expect(list.head!.data).toEqual(0)
    expect(list.head!.next!.data).toEqual(-1)
    expect(list.head!.next!.next!.data).toEqual(-4)
  })
})
