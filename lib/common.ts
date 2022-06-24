export type Opt<T> = T extends never ? never : null | T | undefined

class LinkedListNode<T> {
  readonly #data: T
  next: Opt<LinkedListNode<T>>

  constructor(node: T, next?: T) {
    this.#data = node
    if (next) this.next = new LinkedListNode(next)
  }

  get data() {
    return this.#data
  }
}

class DoublyLinkListNode<T> {
  readonly #data: T
  prev: Opt<DoublyLinkListNode<T>>
  next: Opt<DoublyLinkListNode<T>>

  constructor(node: T, [prev, next]: T[] = []) {
    this.#data = node
    if (prev) this.prev = new DoublyLinkListNode(prev)
    if (next) this.next = new DoublyLinkListNode(next)
  }

}

export {
  LinkedListNode,
  DoublyLinkListNode
}
