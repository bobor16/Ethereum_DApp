const Bank = artifacts.require('Bank.sol')

contract("Bank", async (accounts) => {
    it("allows a user to deposit funds", async () => {
        const bank = await Bank.new()
        const depositor = accounts[1]

        const amount = web3.utils.toWei('10', 'ether')

        await bank.deposit({
            from: depositor,
            value: amount
        })

        let balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))

        assert.equal(balance, 10)
    })

    it("allows a user to withdraw funds", async () => {
        const bank = await Bank.new()
        const depositor = accounts[2]

        const amount = web3.utils.toWei('20', 'ether')

        await bank.deposit({
            from: depositor,
            value: amount
        })

        let balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))
        assert.equal(balance, 20)

        const withdraw_amount = web3.utils.toWei('10', 'ether')
        await bank.withdraw(withdraw_amount, {
            from: depositor
        })

        balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))
        assert.equal(balancem, 10)
    })
})