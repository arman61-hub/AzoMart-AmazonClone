export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const USER_ID = "default-user"; // Default context for COD e-commerce clone

// Helper to fetch and return the complete updated cart
async function getCart() {
  return await prisma.cartItem.findMany({
    where: { userId: USER_ID },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function GET() {
  try {
    const cartItems = await getCart();
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json();

    if (!productId || isNaN(parseInt(productId))) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const qty = parseInt(quantity) || 1;
    const prodId = parseInt(productId);

    // Verify product exists and has stock
    const product = await prisma.product.findUnique({
      where: { id: prodId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Upsert the cart item
    await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: USER_ID,
          productId: prodId,
        },
      },
      update: {
        quantity: {
          increment: qty,
        },
      },
      create: {
        userId: USER_ID,
        productId: prodId,
        quantity: qty,
      },
    });

    const updatedCart = await getCart();
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json();

    if (!productId || isNaN(parseInt(productId))) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const qty = parseInt(quantity);
    const prodId = parseInt(productId);

    if (qty <= 0) {
      // Remove if qty is 0 or negative
      await prisma.cartItem.delete({
        where: {
          userId_productId: {
            userId: USER_ID,
            productId: prodId,
          },
        },
      });
    } else {
      // Update quantity
      await prisma.cartItem.update({
        where: {
          userId_productId: {
            userId: USER_ID,
            productId: prodId,
          },
        },
        data: {
          quantity: qty,
        },
      });
    }

    const updatedCart = await getCart();
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("PUT /api/cart error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productIdStr = searchParams.get("productId");

    if (!productIdStr || isNaN(parseInt(productIdStr))) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const prodId = parseInt(productIdStr);

    await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId: USER_ID,
          productId: prodId,
        },
      },
    });

    const updatedCart = await getCart();
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
