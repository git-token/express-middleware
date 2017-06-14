module.exports = {
  name: 'GitToken',
  symbol: 'GTK',
  decimals: 8,
  rewardValues: [
    250, // commitComment | Any time a Commit is commented on.
    1000, // create | Any time a Branch or Tag is created.
    0, // delete | Any time a Branch or Tag is deleted.
    10000, // deployment | Any time a Repository has a new deployment created from the API.
    0, // deploymentStatus | Any time a deployment for a Repository has a status update from
    15000, // fork | Any time a Repository is forked.
    750, // gollum | Any time a Wiki page is updated.
    0, // installation | Any time a GitHub App is installed or uninstalled.
    0, // installationRepositories | Any time a repository is added or removed from an
    250, // issueComment | Any time a comment on an issue is created, edited, or deleted.
    1000, // issues | Any time an Issue is assigned, unassigned, labeled, unlabeled, opened, edited,
    100, // label | Any time a Label is created, edited, or deleted.
    0, // marketplacePurchase | Any time a user purchases, cancels, or changes their GitHub
    25000, // member | Any time a User is added or removed as a collaborator to a Repository, or has their
    5000, // membership | Any time a User is added or removed from a team. Organization hooks only.
    15000, // milestone | Any time a Milestone is created, closed, opened, edited, or deleted.
    100000, // organization | Any time a user is added, removed, or invited to an Organization.
    0, // orgBlock | Any time an organization blocks or unblocks a user. Organization hooks only.
    1000, // pageBuild | Any time a Pages site is built or results in a failed build.
    0, // projectCard | Any time a Project Card is created, edited, moved, converted to an issue,
    0, // projectColumn | Any time a Project Column is created, edited, moved, or deleted.
    1000, // ping | Use when setting up the webhook for github
  ]
}
