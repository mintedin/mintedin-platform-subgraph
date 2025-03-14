import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BatchMetadataUpdate as BatchMetadataUpdateEvent,
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
  EIP712DomainChanged as EIP712DomainChangedEvent,
  Initialized as InitializedEvent,
  MetadataUpdate as MetadataUpdateEvent,
  Paused as PausedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent,
  Upgraded as UpgradedEvent,
  FreelancerNFT,
  SetFreelancerDataCall,
} from "../generated/FreelancerNFT/FreelancerNFT";
import {
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  DelegateChanged,
  DelegateVotesChanged,
  EIP712DomainChanged,
  Initialized,
  MetadataUpdate,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
  Unpaused,
  Upgraded,
  Freelancer,
} from "../generated/schema";
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBatchMetadataUpdate(
  event: BatchMetadataUpdateEvent
): void {
  let entity = new BatchMetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._fromTokenId = event.params._fromTokenId;
  entity._toTokenId = event.params._toTokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDelegateChanged(event: DelegateChangedEvent): void {
  let entity = new DelegateChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.delegator = event.params.delegator;
  entity.fromDelegate = event.params.fromDelegate;
  entity.toDelegate = event.params.toDelegate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): void {
  let entity = new DelegateVotesChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.delegate = event.params.delegate;
  entity.previousVotes = event.params.previousVotes;
  entity.newVotes = event.params.newVotes;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.version = event.params.version;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMetadataUpdate(event: MetadataUpdateEvent): void {
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._tokenId = event.params._tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Update the freelancer URI when metadata is updated
  let freelancer = Freelancer.load(event.params._tokenId.toString());
  if (freelancer) {
    let contract = FreelancerNFT.bind(event.address);
    let tokenURICall = contract.try_tokenURI(event.params._tokenId);
    if (!tokenURICall.reverted) {
      freelancer.uri = tokenURICall.value;
    }
    freelancer.updatedAt = event.block.timestamp;
    freelancer.save();
  }
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Handle minting (when from is the zero address)
  if (
    event.params.from.toHexString() ==
    "0x0000000000000000000000000000000000000000"
  ) {
    // This is a mint event
    let freelancer = new Freelancer(event.params.tokenId.toString());
    freelancer.owner = event.params.to;
    freelancer.tokenId = event.params.tokenId;

    // Initialize with default values
    freelancer.revenue = BigInt.fromI32(0);
    freelancer.jobAcceptedCount = BigInt.fromI32(0);
    freelancer.jobCompletedCount = BigInt.fromI32(0);

    // Set creation and update timestamps
    freelancer.createdAt = event.block.timestamp;
    freelancer.updatedAt = event.block.timestamp;

    // Try to fetch token URI
    let contract = FreelancerNFT.bind(event.address);
    let tokenURICall = contract.try_tokenURI(event.params.tokenId);
    if (!tokenURICall.reverted) {
      freelancer.uri = tokenURICall.value;
    }

    freelancer.save();
  } else {
    // This is a transfer event (not a mint)
    // Update the owner of the freelancer
    let freelancer = Freelancer.load(event.params.tokenId.toString());
    if (freelancer) {
      freelancer.owner = event.params.to;
      freelancer.updatedAt = event.block.timestamp;
      freelancer.save();
    }
  }
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.implementation = event.params.implementation;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

// Handler for the setFreelancerData function call
export function handleSetFreelancerData(call: SetFreelancerDataCall): void {
  let tokenId = call.inputs.tokenId;
  let freelancerData = call.inputs.data;

  let freelancer = Freelancer.load(tokenId.toString());
  if (freelancer == null) {
    freelancer = new Freelancer(tokenId.toString());
    freelancer.tokenId = tokenId;

    // Try to get the owner from the contract
    let contract = FreelancerNFT.bind(call.to);
    let ownerCall = contract.try_ownerOf(tokenId);
    if (!ownerCall.reverted) {
      freelancer.owner = ownerCall.value;
    }

    freelancer.createdAt = call.block.timestamp;
  }

  // Update the freelancer data based on the actual structure in the contract
  freelancer.revenue = freelancerData.revenue;
  freelancer.jobAcceptedCount = freelancerData.jobAcceptedCount;
  freelancer.jobCompletedCount = freelancerData.jobCompletedCount;
  freelancer.updatedAt = call.block.timestamp;

  // Save the freelancer
  freelancer.save();
}

// Helper function to convert job status number to string
function getJobStatusString(status: number): string {
  if (status == 0) return "PENDING";
  if (status == 1) return "IN_PROGRESS";
  if (status == 2) return "COMPLETED";
  if (status == 3) return "CANCELLED";
  return "UNKNOWN";
}
