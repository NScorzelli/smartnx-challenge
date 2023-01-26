import User from '../models/User'

describe('User', () => {
  it('should be ok', () => {
    const user = new User()

    user.name = 'John Doe'

    expect(user.name).toEqual('John Doe')
  })
})
