module.exports = {
  commitComment: 0,              // | Any time a Commit is commented on.
  create: 1,                     // | Any time a Branch or Tag is created.
  delete: 2,                     // | Any time a Branch or Tag is deleted.
  deployment: 4,                 // | Any time a Repository has a new deployment created from the API.
  deploymentStatus: 5,           // | Any time a deployment for a Repository has a status update from
  fork: 6,                       // | Any time a Repository is forked.
  gollum: 7,                     // | Any time a Wiki page is updated.
  installation: 8,               // | Any time a GitHub App is installed or uninstalled.
  installationRepositories: 9,   // | Any time a repository is added or removed from an
  issueComment: 10,              // | Any time a comment on an issue is created, edited, or deleted.
  issues: 11,                    // | Any time an Issue is assigned, unassigned, labeled, unlabeled, opened, edited,
  label: 12,                     // | Any time a Label is created, edited, or deleted.
  marketplacePurchase: 13,       // | Any time a user purchases, cancels, or changes their GitHub
  member: 14,                    // | Any time a User is added or removed as a collaborator to a Repository, or has their
  membership: 15,                // | Any time a User is added or removed from a team. Organization hooks only.
  milestone: 16,                 // | Any time a Milestone is created, closed, opened, edited, or deleted.
  organization: 17,              // | Any time a user is added, removed, or invited to an Organization.
  orgBlock: 18,                  // | Any time an organization blocks or unblocks a user. Organization hooks only.
  pageBuild: 19,                 // | Any time a Pages site is built or results in a failed build.
  projectCard: 20,               // | Any time a Project Card is created, edited, moved, converted to an issue,
  projectColumn: 21,             // | Any time a Project Column is created, edited, moved, or deleted.
  ping: 22,                      // | Use when setting up the webhook for github
}
