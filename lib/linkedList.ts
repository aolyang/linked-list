import { LinkedListNode, Opt } from "./common";

class LinkedList<T> {
  head: Opt<LinkedListNode<T>> = null
  tail: Opt<LinkedListNode<T>> = null
  size: number

  constructor(data: T[] = []) {
    if (process.env.NODE_ENV === "development" && !(data instanceof Array)) {
      throw new Error("LinkedList only accept Array type argument, but get " + typeof data)
    }

    const [head, ...nodes] = data

    this.size = data.length

    if (head !== undefined) this.head = new LinkedListNode(head)

    if (nodes.length) {
      this.tail = nodes.reduce<LinkedListNode<any>>((prev, next) => {
        const _next = new LinkedListNode(next)
        _next.prev = prev
        return prev.next = _next
      }, this.head!)
    }
  }
}

export {
  LinkedList
}
