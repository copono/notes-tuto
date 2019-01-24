import assert from "assert";

import '../imports/startup/test-config.js';

import '../imports/api/users.test';
import '../imports/api/notes.test';
import '../imports/ui/PrivateHeader.test';
import '../imports/ui/Login.test';
import '../imports/ui/Signup.test';

describe("notesapp", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "notes");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
