export type Opt<T> = T | null

class LinkedListNode<T> {
  readonly #data: Opt<T>
  prev: Opt<LinkedListNode<Opt<T>>> = null
  next: Opt<LinkedListNode<Opt<T>>>  = null

  constructor(node: T | null = null, prev?: T , next?: T ) {
    this.#data = node

    if (prev) this.prev = new LinkedListNode(prev)
    if (next) this.next = new LinkedListNode(next)
  }


  get data() {
    return this.#data
  }
}

export {
  LinkedListNode
}
