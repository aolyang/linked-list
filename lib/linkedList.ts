import { LinkedListNode } from "./common";

class LinkedList<T> {
  head?: LinkedListNode<T>
  tail?: LinkedListNode<T>
  size: number

  constructor(data: T[] = []) {
    const [head, ...nodes] = data

    this.size = data.length

    if (!head) return
    this.head = new LinkedListNode(head)
    if (nodes.length) this.tail = nodes.reduce<LinkedListNode<T>>((prev, next) => prev.next = new LinkedListNode(next), this.head)
  }
}

export {
  LinkedList
}
