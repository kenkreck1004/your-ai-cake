module characteristic::characteristic_nft {
    use std::string::{String};
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::package;
    use sui::display;
    use sui::coin::{Self, Coin, value};
    use sui::sui::SUI;

    // === Constants ===
    const FIXED_FEE: u64 = 10_000_000; // 0.01 SUI
    const FIXED_OWNER: address = @0x8ae23ffa1563dd586ef4a5f8f633bfb0e62c4157e3ea3ddde87509aa38f2870d; // 🔁 Thay bằng địa chỉ của bạn

    // === Structs ===

    /// NFT dữ liệu cơ bản
    public struct CharacteristicNFT has key, store {
        id: UID,
        name: String,
        description: String,
        image_url: String,
    }

    /// One-time witness cho init
    public struct CHARACTERISTIC_NFT has drop {}

    // === Init ===

    fun init(
        otw: CHARACTERISTIC_NFT,
        ctx: &mut TxContext
    ) {
        let sender = ctx.sender();

        let keys = vector[
            b"name".to_string(),
            b"description".to_string(),
            b"image_url".to_string(),
        ];
        let values = vector[
            b"{name}".to_string(),
            b"{description}".to_string(),
            b"{image_url}".to_string(),
        ];

        let publisher = package::claim(otw, ctx);
        let mut display = display::new_with_fields<CharacteristicNFT>(&publisher, keys, values, ctx);
        display::update_version(&mut display);

        transfer::public_transfer(publisher, sender);
        transfer::public_transfer(display, sender);
    }

    // === Mint NFT ===

    public entry fun mint(
        name: String,
        description: String,
        image_url: String,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let sender = ctx.sender();
        let amount = value(&payment);
        assert!(amount == FIXED_FEE, 0);

        transfer::public_transfer(payment, FIXED_OWNER);

        let nft = CharacteristicNFT {
            id: object::new(ctx),
            name,
            description,
            image_url,
        };

        transfer::public_transfer(nft, sender);
    }

    // === Burn / Transfer ===

    public entry fun burn_nft(nft: CharacteristicNFT, _: &mut TxContext) {
        let CharacteristicNFT { id, name: _, description: _, image_url: _ } = nft;
        object::delete(id);
    }

    public entry fun transfer_nft(nft: CharacteristicNFT, recipient: address, _: &mut TxContext) {
        transfer::public_transfer(nft, recipient);
    }

    // === Views ===

    public fun name(nft: &CharacteristicNFT): &String {
        &nft.name
    }

    public fun description(nft: &CharacteristicNFT): &String {
        &nft.description
    }

    public fun image_url(nft: &CharacteristicNFT): &String {
        &nft.image_url
    }

    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(CHARACTERISTIC_NFT {}, ctx);
    }
}
