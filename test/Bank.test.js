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

        let bankTotalBalance = await web3.eth.getBalance(bank.address)
        bankTotalBalance = web3.utils.fromWei(bankTotalBalance)
        console.log("bank balance: ", bankTotalBalance)

        const amount = web3.utils.toWei('20', 'ether')

        await bank.deposit({
            from: depositor,
            value: amount
        })

        bankTotalBalance = await web3.eth.getBalance(bank.address)
        bankTotalBalance = web3.utils.fromWei(bankTotalBalance)
        console.log("bank balance: ", bankTotalBalance)

        let balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))
        assert.equal(balance, 20)

        const withdraw_amount = web3.utils.toWei('10', 'ether')
        await bank.withdraw(withdraw_amount, {
            from: depositor
        })

        bankTotalBalance = await web3.eth.getBalance(bank.address)
        bankTotalBalance = web3.utils.fromWei(bankTotalBalance)
        console.log("bank balance: ", bankTotalBalance)

        balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))
        assert.equal(balance, 10)

        assert.equal(parseInt(bankTotalBalance), 10)
    })
})