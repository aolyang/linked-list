export type Opt<T> = T | null

class LinkedListNode<T> {
  #data: Opt<T>
  prev: Opt<LinkedListNode<Opt<T>>> = null
  next: Opt<LinkedListNode<Opt<T>>> = null

  constructor(data: T, prev?: T, next?: T) {
    this.#data = data

    if (prev) this.prev = new LinkedListNode(prev)
    if (next) this.next = new LinkedListNode(next)
  }


  get data() {
    return this.#data
  }

  destroy() {
    this.#data = this.prev = this.next = null
  }
}

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

  insert(data: T, index?: number) {
    const node = new LinkedListNode(data)

    let ok = false
    if (this.size === 0) {
      this.head = this.tail = node
      ok = true
    } else if (index === undefined) {
      if (this.size === 1) {
        this.head!.next = node
        node.prev = this.head
        this.tail = node
      } else {
        this.tail!.next = node
        node.prev = this.tail
        this.tail = node
      }
      ok = true
    } else {
      this.forEach((_node, _index, stop) => {
        if (_index === index) {
          if (index === 0) {
            node.next = this.head
            this.head = node
          } else if (index === 1) {
            const next = this.head!.next!
            next.prev = node
            node.next = next
            node.prev = this.head
            this.head!.next = node
          } else if (index === (this.size - 1)) {
            node.prev = this.tail!.prev
            node.next = this.tail
            node.prev!.next = node
            this.tail!.prev = node
          } else {
            node.prev = _node.prev
            node.prev!.next = node

            node.next = _node
            _node.prev = node
          }

          stop()
          ok = true
        }
      })
    }
    if (ok) this.size++
    return ok ? node : null
  }

  remove(fn: ((node: LinkedListNode<T>, index: number) => boolean)): T | null {
    let _node: T | null = null
    this.forEach((node, index, stop) => {
      if (fn(node, index)) {
        if (index === 0 && this.head?.next) {
          this.head.next.prev = null
          this.head = this.head.next as any
        } else if (index === (this.size - 1) && this.tail?.prev) {
          this.tail.prev.next = null
          this.tail = this.tail.prev as any
        } else {
          node.prev!.next = node.next
          node.next!.prev = node.prev
        }
        _node = node.data
        node.destroy()
        this.size--
        stop()
      }
    })
    return _node
  }

  forEach<R = T>(fn: (node: LinkedListNode<R>, index: number, stop: () => void) => any) {
    if (!this.head) return
    let cur: Opt<LinkedListNode<any>> = this.head
    let index = 0
    let _break = false
    const stop = () => {
      _break = true
    }
    while (cur && this.size > index) {
      fn(cur, index, stop)
      if (_break) break
      cur = cur.next
      index++
    }
  }

  map<R, N = T>(fn: (node: LinkedListNode<N>, index: number) => R): R[] {
    let results: R[] = []
    this.forEach<N>((node, index) => {
      results.push(fn(node, index))
    })
    return results
  }

  filter<R = T>(fn: (node: LinkedListNode<R>, index: number) => boolean): LinkedListNode<R>[] {
    let results: LinkedListNode<R>[] = []
    this.forEach<R>((node, index) => {
      if (fn(node, index)) {
        results.push(node)
      }
    })
    return results
  }

  findIndex<R = T>(fn: (node: LinkedListNode<R>, index: number) => boolean): number {
    let _index = -1
    this.forEach<R>((node, index, stop) => {
      if (fn(node, index)) {
        _index = index
        stop()
      }
    })
    return _index
  }

  find<R = T>(fn: (node: LinkedListNode<R>, index: number) => boolean): LinkedListNode<R> | undefined {
    let _node: LinkedListNode<R> | undefined = undefined
    this.forEach<R>((node, index, stop) => {
      if (fn(node, index)) {
        _node = node
        stop()
      }
    })
    return _node
  }

  push(...data: T[]) {
    data.forEach(_d => this.insert(_d))
  }

  shift() {
    return this.remove((_, index) => index === 0)
  }

  unshift<R = T>(data: R) {
    const node = new LinkedListNode(data as any)
    if (this.size === 0) {
      this.tail = this.head = node
    } else {
      node.next = this.head
      this.head!.prev = node
      this.head = node
      if (this.size === 1) {
        this.head!.next = this.tail
        this.tail!.prev = this.head
      }
    }
    this.size++
    return node
  }
}

export {
  LinkedListNode,
  LinkedList
}
