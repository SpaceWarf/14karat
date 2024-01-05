export interface DiscordWebhook {
    url: string,
    content: string,
    embeds: DiscordWebhookEmbed[],
}

export interface DiscordWebhookEmbed {
    type: string,
    title?: string,
    description?: string,
    fields?: DiscordWebhookEmbedField[],
    image?: DiscordWebhookEmbedImage,
}

export interface DiscordWebhookEmbedField {
    name: string,
    value: string,
    inline: boolean,
}

export interface DiscordWebhookEmbedImage {
    url: string,
}