const Bank = artifacts.require('Bank.sol')
 /**
  * Only the first test case has documentation due to the rest being 
  * so similar.
  */
contract("Bank", async (accounts) => {
    // creates a testcase function
    it("allows a user to deposit funds", async () => {
        const bank = await Bank.new() // create a new Bank contract
        const depositor = accounts[1] // uses the account on index 1

        // convert to wei due to the smallest ethere unit
        const amount = web3.utils.toWei('10', 'ether')
        
        // deposit into the current account using the contract (account 1)
        await bank.deposit({
            from: depositor,
            value: amount
        })

        let balance = await bank.balanceOf(depositor) // gets the balance of the current account
        balance = parseInt(web3.utils.fromWei(balance, 'ether')) // convert back from wei
        assert.equal(balance, 10) // assert balance is the same as 10
    })

    it("allows a user to withdraw funds", async () => {
        const bank = await Bank.new()
        const depositor = accounts[2]

        let bankTotalBalance = await web3.eth.getBalance(bank.address)
        bankTotalBalance = web3.utils.fromWei(bankTotalBalance)

        const amount = web3.utils.toWei('20', 'ether')

        await bank.deposit({
            from: depositor,
            value: amount
        })

        bankTotalBalance = await web3.eth.getBalance(bank.address)
        bankTotalBalance = web3.utils.fromWei(bankTotalBalance)

        let balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))
        assert.equal(balance, 20)

        const withdraw_amount = web3.utils.toWei('10', 'ether')
        await bank.withdraw(withdraw_amount, {
            from: depositor
        })

        bankTotalBalance = await web3.eth.getBalance(bank.address)
        bankTotalBalance = web3.utils.fromWei(bankTotalBalance)

        balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))
        assert.equal(balance, 10)

        assert.equal(parseInt(bankTotalBalance), 10)
    })

    it("allows a user to check balance", async () => {
        const bank = await Bank.new()
        const depositor = accounts[2]

        let balance = await bank.balanceOf(depositor)
        balance = parseInt(web3.utils.fromWei(balance, 'ether'))
        assert.equal(balance, 0)
    })
})