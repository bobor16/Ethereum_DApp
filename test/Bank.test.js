const Bank = artifacts.require('Bank.sol')

contract("Bank", async (accounts) => {
    it("allows a user to deposit funds", async () => {
        const bank = await Bank.new()
        const depositor = accounts[1]

        const amount = web3.utils.toWei('10', 'ether')

        await bank.deposit(amount, {
            from: depositor,
            value: amount
        })

        let balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))

        assert.equal(balance, 10)
    })
})