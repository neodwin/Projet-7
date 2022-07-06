// mockHash est le hash du password : "MayTheForce"
const mockHash = "$2b$10$aBmqnEG4TP2WTL0BbZLCBedMXnzr8MItwgH.j5HdkwspALuUnndyq"

const user1 = { email: "edwin@edwin.fr", password: mockHash }
const user2 = { email: "bob@bob.fr", password: mockHash }
const user3 = { email: "joe@joe.fr", password: mockHash }
const users = [user1, user2, user3]

module.exports = { users }